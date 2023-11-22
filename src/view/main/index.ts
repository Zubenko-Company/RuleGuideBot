import { Markup, Scenes } from 'telegraf';
import { InformerContext } from '@view/context';

export const SceneMainMenu =
	new Scenes.BaseScene<InformerContext>('mainMenu');

SceneMainMenu.enter(async (ctx) => {
	const isUserAdmin = (await ctx.User).isAdmin;

	await ctx.reply(
		'ВЫБИРАЕМ',
		Markup.keyboard([
			['Основные правила'],
			['Виды обратной связи'],
			isUserAdmin ? ['ADMIN'] : [],
		]).resize(),
	);
});

SceneMainMenu.hears('ADMIN', async (ctx) => {
	if ((await ctx.User).isAdmin) ctx.navigator.goto('Admin');
});
SceneMainMenu.hears('Основные правила', (ctx) =>
	ctx.navigator.goto('FeedbackRules'),
);
SceneMainMenu.hears('Виды обратной связи', (ctx) =>
	ctx.navigator.goto('FeedbackModels'),
);
