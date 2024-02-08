import { Markup, Scenes } from 'telegraf';
import { InformerContext } from '@view/context';
import { FEEDBACKINFO } from '@models/feedbackInfo';

export const SceneAboutFeedback =
	new Scenes.BaseScene<InformerContext>('aboutFeedback');

let layer = 1;

SceneAboutFeedback.enter(async (ctx) => {
	await ctx.reply(
		FEEDBACKINFO[0].content,
		Markup.keyboard([['Дальше'], ['Назад']]).resize(),
	);
});

SceneAboutFeedback.hears('Дальше', async (ctx) => {
	let buttons = [['Дальше'], ['Назад']];

	if (layer === FEEDBACKINFO.length - 1) {
		buttons = [['Назад']];
	}

	await ctx.reply(
		FEEDBACKINFO[layer].content,
		Markup.keyboard(buttons).resize(),
	);

	layer++;
});

SceneAboutFeedback.hears('Назад', async (ctx) => {
	return ctx.navigator.goto('MainMenu');
});
