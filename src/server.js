const express = require('express');
const config = require('./config');
const jobs = require('./jobs');

const transactionController = require('./controllers/transaction-controller');

const app = express();

app.use('/api/v1/transactions', transactionController);

jobs.forEach((job) => job.run());

app.listen(config.port, () => {
	console.log(`App listen on port ${config.port}`);
});
