const config = {
	port: process.env.PORT || 5000,
	etherscanApiKey: process.env.ETHERSCAN_API_KEY,
	mongo: {
		url: process.env.MONGO_URL || 'mongodb://localhost:27017',
	},
	etherscanUrl: 'https://api.etherscan.io/api/',
	initDepth: 10,
	requestTimeout: 2000,
};

module.exports = config;
