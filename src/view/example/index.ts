import { Markup, Scenes } from 'telegraf';
import { InformerContext } from '@view/context';
import { MODELS } from '@models/feedback';

export const SceneExample =
	new Scenes.BaseScene<InformerContext>('Example');

SceneExample.enter(async (ctx) => {
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

	const buttons =
		model.example.length > 1
			? [['Еще пример'], ['Назад']]
			: [['Назад']];

	return ctx.reply(
		model.example[0],
		Markup.keyboard(buttons).resize(),
	);
});

SceneExample.hears('Еще пример', async (ctx) => {
	const choosenFeedback = await ctx.withUser(
		(u) => u.currentModel,
	);
	const model = MODELS.find((el) => el.tag === choosenFeedback);

	return ctx.reply(
		model!.example[1],
		Markup.keyboard([['Назад']]).resize(),
	);
});

SceneExample.hears('Назад', (ctx) =>
	ctx.navigator.goto('Search'),
);
