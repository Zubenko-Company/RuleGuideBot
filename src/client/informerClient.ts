import { createInformerApi } from 'informer-client';

const { sendMessage } = createInformerApi({
	url: process.env.INFORMER_URL!,
	token: process.env.INFORMER_TOKEN!,
});

export const sendTopic = async (message: {
	topic: string;
	content: string;
}) => {
	if (process.env.IS_PROD === 'false') {
		return;
	}
	try {
		const req = await sendMessage({
			topic: message.topic,
			message: message.content,
		});

		if (req !== 200) {
			console.log(`Ошибка в запросе (${req})`);
		}
	} catch (e) {
		console.log(e);
	}
};
