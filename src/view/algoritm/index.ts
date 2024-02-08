import { Markup, Scenes } from 'telegraf';
import { InformerContext } from '@view/context';
import { MODELS } from '@models/feedback';
import * as fs from 'fs';

export const SceneAlgoritm =
	new Scenes.BaseScene<InformerContext>('algoritm');

SceneAlgoritm.enter(async (ctx) => {
	let buttons = [['Все ясно. Назад.']];

	const choosenFeedback = await ctx.withUser(
		(u) => u.currentModel,
	);

	if (!choosenFeedback) {
		console.log('ctx.choosenFeedback is empty');
		return ctx.navigator.goto('Search');
	}
	const model = MODELS.find((el) => el.tag === choosenFeedback);
	if (!model) {
		return ctx.navigator.goto('Search');
	}

	await ctx.replyWithPhoto({
		source: fs.createReadStream(model.algoritm.imageSource),
	});

	if (model.example.length > 0)
		buttons = [['Все ясно. Назад.'], ['Нужен пример']];

	return ctx.replyWithMarkdownV2(
		model.algoritm.info,
		Markup.keyboard(buttons).resize(),
	);
});

SceneAlgoritm.hears('Все ясно. Назад.', (ctx) =>
	ctx.navigator.goto('MainMenu'),
);

SceneAlgoritm.hears('Нужен пример', (ctx) =>
	ctx.navigator.goto('Example'),
);
