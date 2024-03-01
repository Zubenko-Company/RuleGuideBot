export const sceneErrorHandler = (err: unknown): void => {
	if (err instanceof Error) {
		console.log('AШИBKА: ', err);
	}
};
