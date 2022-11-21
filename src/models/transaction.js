module.exports = (mongoose) => {
	const transactionSchema = new mongoose.Schema({
		blockNumber: Number,
		transactionId: String,
		senderAddress: String,
		recipientAdress: String,
		date: Date,
		value: Number,
		transactionFee: Number,
	});

	const Transaction = mongoose.model('Transactions', transactionSchema);

	return Transaction;
};
