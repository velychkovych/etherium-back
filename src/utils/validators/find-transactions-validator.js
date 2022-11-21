module.exports = Object.freeze({
	validate: ({ frameNumber = 1, findBy = '', frameSize = 10 }) => {
		const validatedFrameNumber = frameNumber > 0 ? frameNumber : 1;
		const validatedFindBy = [
			'blockNumber',
			'transactionId',
			'senderAddress',
			'recipientAdress',
		].includes(findBy)
			? findBy
			: '';
		const validatedFrameSize = frameSize > 0 ? frameSize : 10;
		return {
			frameNumber: validatedFrameNumber,
			findBy: validatedFindBy,
			frameSize: validatedFrameSize,
		};
	},
});
