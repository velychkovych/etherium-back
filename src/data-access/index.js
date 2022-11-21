const { Transaction } = require('../models');

const buildTransactionDao = require('./transaction-dao');

const transactionDao = buildTransactionDao(Transaction);

module.exports = {
	transactionDao,
};
