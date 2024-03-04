import { sendTopic } from 'src/client';

export const sceneErrorHandler = (err: unknown): void => {
	if (err instanceof Error) {
		console.log('AШИBKА: ', err);

		sendTopic({
			topic: 'ошибки',
			content: `@animu_hater\n${err.name}\n${err.message}`,
		});
	}
};
