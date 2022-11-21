const mongoose = require('mongoose');
const config = require('../config');

const buildTransaction = require('./transaction');

mongoose.Promise = global.Promise;

mongoose.connect(config.mongo.url);

mongoose.connection
	.once('open', () => {
		console.log('Connection has been made');
	})
	.on('error', (error) => {
		console.log('Connect error', error);
	})
	.on('disconnected', () => {
		console.log('Connection disconnected');
	});

const Transaction = buildTransaction(mongoose);

module.exports = {
	Transaction,
};
