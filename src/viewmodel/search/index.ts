import { FeedbackType } from '@models/all';

export class SearchPrettify {
	public static prettify(feedback: FeedbackType) {
		const messageRaw = [
			// '\nМодель:\n',
			// feedback.situations.map((tag) => `  • ${this.name}`),
			'\n\n ✏️ Ситуации для применения \n',
			feedback.situations.map((sit) => `  • ${sit}`),
			'\n ✏️ Основные правила \n',
			feedback.rules.map((rule) => `  • ${rule}`),
		];

		const message = messageRaw.flat().join('\n');

		return message;
	}
}
