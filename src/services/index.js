const { transactionDao } = require('../data-access');
const findTransactionsValidator = require('../utils/validators/find-transactions-validator');

const buildTransactionService = require('./transaction-service');

const transactionService = buildTransactionService({
	transactionDao,
	findTransactionsValidator,
});

module.exports = {
	transactionService,
};
