const axios = require('axios');
const config = require('../../config');

module.exports = Object.freeze({
	getLastBlock: async () => {
		const result = await axios.get(config.etherscanUrl, {
			params: {
				module: 'proxy',
				action: 'eth_getBlockByNumber',
				boolean: true,
				apikey: config.etherscanApiKey,
			},
		});
		return result.data;
	},
	getBlockByNumber: async (blockNumber) => {
		const result = await axios.get(config.etherscanUrl, {
			params: {
				module: 'proxy',
				action: 'eth_getBlockByNumber',
				boolean: true,
				apikey: config.etherscanApiKey,
				tag: blockNumber,
			},
		});
		return result.data;
	},
});
