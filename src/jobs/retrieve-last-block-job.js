module.exports = ({ transactionService, etherscanProvider, config }) => {
	let lastBlockFetched;

	const parseResult = (result, number = undefined) => {
		const blockNumber = number || parseInt(result.number, 16);
		if (blockNumber === lastBlockFetched) {
			console.log('block was already fetched, skiping');
			return null;
		}
		lastBlockFetched = blockNumber;
		const date = new Date(parseInt(result.timestamp, 16) * 1000);
		return {
			transactions: result.transactions.map((transaction) => ({
				blockNumber,
				transactionId: transaction.hash,
				senderAddress: transaction.from,
				recipientAdress: transaction.to,
				date,
				value: parseInt(transaction.value, 16) / 10 ** 18,
				transactionFee: parseInt(transaction.gasPrice, 16) / 10 ** 18,
			})),
			blockNumber,
		};
	};

	const getLastBlock = async () => {
		const { result } = await etherscanProvider.getLastBlock();
		return parseResult(result);
	};

	const repeat = async () => {
		const result = await getLastBlock();
		if (result) transactionService.createMany(result.transactions);
		setTimeout(repeat, config.requestTimeout);
	};

	const getInitialBlocks = async () => {
		const transactions = [];
		const lastBlockResult = await getLastBlock();
		transactions.push(lastBlockResult.transactions);

		const getTransactions = async (counter) => {
			if (counter === config.initDepth) return new Promise((r) => r());
			const blockNumber = lastBlockResult.blockNumber - counter;
			const { result } = await etherscanProvider.getBlockByNumber(
				blockNumber.toString(16)
			);
			transactions.push(parseResult(result, blockNumber).transactions);
			await new Promise((r) => setTimeout(r, config.requestTimeout));
			return getTransactions(counter + 1);
		};

		await getTransactions(1);
		transactionService.createMany(transactions.flat());
	};

	async function run() {
		const transactionExists = await transactionService.transactionExists();
		if (!transactionExists) {
			console.log(
				`no transactions found, fetching initial ${config.initDepth} blocks`
			);
			await getInitialBlocks();
		}
		repeat();
	}

	return Object.freeze({ run });
};
