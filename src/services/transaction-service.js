module.exports = ({ transactionDao, findTransactionsValidator }) => {
	async function transactionExists() {
		const transaction = await transactionDao.findOne();
		return !!transaction;
	}

	async function findManyWithFilters(options, value) {
		const validated = findTransactionsValidator.validate(options);
		const lastBlockNumber = await transactionDao.findLastBlockNumber();
		const transactions = await transactionDao.findManyWithFilters({
			limit: validated.frameSize,
			skip: validated.frameNumber * validated.frameSize,
			findBy: validated.findBy,
			value,
		});
		return transactions.map((transaction) => ({
			...transaction,
			blockConfirmations: lastBlockNumber - transaction.blockNumber + 1,
		}));
	}

	async function createMany(transactions) {
		console.log(`creating ${transactions.length} transactions`);
		return transactionDao.createMany(transactions);
	}

	return Object.freeze({
		transactionExists,
		findManyWithFilters,
		createMany,
	});
};
