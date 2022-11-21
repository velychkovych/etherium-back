const express = require('express');
const { transactionService } = require('../services');

const router = express.Router();

router.get('/', async (req, res) => {
	const result = await transactionService.findManyWithFilters(
		{
			frameNumber: req.query.frameNumber,
			findBy: req.query.findBy,
			frameSize: req.query.frameSize,
		},
		req.query.value
	);
	res.status(200).send(result);
});

module.exports = router;
