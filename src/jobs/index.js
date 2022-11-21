const { transactionService } = require('../services');
const config = require('../config');
const etherscanProvider = require('../utils/etherscan-provider');

const buildRetreieveLastBlockJob = require('./retrieve-last-block-job');

const retrieveLastBlockJob = buildRetreieveLastBlockJob({
	transactionService,
	etherscanProvider,
	config,
});

module.exports = [retrieveLastBlockJob];
