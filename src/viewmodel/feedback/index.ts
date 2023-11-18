import { FeedbackType } from '@models/all';

export class FeedbackPrettify {
	public static prettify(feedback: FeedbackType) {
		const messageRaw = [
			'\n ✏️ Ситуации для применения ✏️ \n',
			feedback.situations.map((sit) => `  • ${sit}`),
			'\n ✏️ Основные правила ✏️ \n',
			feedback.rules.map((rule) => `  • ${rule}`),
		];

		const message = messageRaw.flat().join('\n');

		return message;
	}
}
