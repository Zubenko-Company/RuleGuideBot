import { createInformerApi } from 'informer-client';

const { sendMessage } = createInformerApi({
	url: 'http://stercus.ru:3000/topic/message',
	token: '80b80b83-625f-46f7-8295-5bb90322d453',
});

export const sendTopic = async (message: {
	topic: string;
	content: string;
}) => {
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
