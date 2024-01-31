import { Markup, Scenes } from 'telegraf';
import { InformerContext } from '@view/context';
import { MODELS } from '@models/feedback';

export const SceneAlgoritm =
	new Scenes.BaseScene<InformerContext>('algoritm');

SceneAlgoritm.enter(async (ctx) => {
	const choosenFeedback = (await ctx.User).currentModel;

	if (!choosenFeedback) {
		console.log('ctx.choosenFeedback is empty');
		return ctx.navigator.goto('Search');
	}
	const model = MODELS.find((el) => el.tag === choosenFeedback);
	if (!model) {
		return ctx.navigator.goto('Search');
	}
	return ctx.replyWithMarkdownV2(
		model.algoritm.info,
		Markup.keyboard([
			['Все ясно. Назад.'],
			['Нужен пример'],
		]).resize(),
	);
});

SceneAlgoritm.hears('Все ясно. Назад.', (ctx) =>
	ctx.navigator.goto('MainMenu'),
);

SceneAlgoritm.hears('Нужен пример', (ctx) =>
	ctx.navigator.goto('MainMenu'),
);
