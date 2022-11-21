module.exports = (Transaction) => {
	const formatTransaction = (transaction) => ({
		id: transaction._id.toString(),
		blockNumber: transaction.blockNumber,
		transactionId: transaction.transactionId,
		senderAddress: transaction.senderAddress,
		recipientAdress: transaction.recipientAdress,
		date: transaction.date,
		value: transaction.value,
		transactionFee: transaction.transactionFee,
		__v: undefined,
		_id: undefined,
	});

	async function findOne() {
		const transaction = await Transaction.findOne({});
		if (!transaction) return null;
		return formatTransaction(transaction);
	}

	async function findLastBlockNumber() {
		const transaction = await Transaction.findOne({}).sort({
			blockNumber: -1,
		});
		return transaction.blockNumber;
	}

	async function findManyWithFilters({ limit, skip, findBy, value }) {
		const findOptions = findBy ? { [findBy]: value } : {};
		const transactions = await Transaction.find(findOptions)
			.sort({ blockNumber: -1 })
			.skip(skip)
			.limit(limit);
		return transactions.map(formatTransaction);
	}

	async function createMany(transactions) {
		return Transaction.insertMany(transactions);
	}

	return Object.freeze({
		findOne,
		findLastBlockNumber,
		findManyWithFilters,
		createMany,
	});
};
