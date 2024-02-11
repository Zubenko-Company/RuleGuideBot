import { Markup, Scenes } from 'telegraf';
import { InformerContext } from '@view/context';
import { FEEDBACKINFO } from '@models/feedbackInfo';

export const SceneAboutFeedback =
	new Scenes.BaseScene<InformerContext>('aboutFeedback');

SceneAboutFeedback.enter(async (ctx) => {
	await ctx.withUser((u) => {
		u.feedBackStep = 1;
	});
	await ctx.reply(
		FEEDBACKINFO[0].content,
		Markup.keyboard([['Дальше'], ['Назад']]).resize(),
	);
});

SceneAboutFeedback.hears('Дальше', async (ctx) => {
	let buttons = [['Дальше'], ['Назад']];
	const layer = await ctx.withUser((u) => u.feedBackStep);
	if (layer === FEEDBACKINFO.length - 1) {
		buttons = [['Назад']];
	}

	await ctx.reply(
		FEEDBACKINFO[layer].content,
		Markup.keyboard(buttons).resize(),
	);

	await ctx.withUser((u) => u.feedBackStep++);
});

SceneAboutFeedback.hears('Назад', async (ctx) => {
	return ctx.navigator.goto('MainMenu');
});
