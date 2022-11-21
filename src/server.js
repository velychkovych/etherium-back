const express = require('express');
const jobs = require('./jobs');

const transactionController = require('./controllers/transaction-controller');

const app = express();

app.use('/api/v1/transactions', transactionController);

jobs.forEach((job) => job.run());

app.listen(3000, () => {
	console.log('App listen on port 3000');
});
