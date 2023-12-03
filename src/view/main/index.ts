import { Markup, Scenes } from 'telegraf';
import { InformerContext } from '@view/context';

export const SceneMainMenu =
	new Scenes.BaseScene<InformerContext>('mainMenu');

SceneMainMenu.enter(async (ctx) => {
	const isUserAdmin = await ctx.withUser((u) => u.isAdmin);

	await ctx.reply(
		'ВЫБИРАЕМ',
		Markup.keyboard([
			['Основные правила'],
			['Виды обратной связи'],
			['Узнай, чем тебе будет полезен наш бот✨'],
			isUserAdmin ? ['🔐🔐🔐АДМИНКА🔐🔐🔐'] : [],
		]).resize(),
	);
});

SceneMainMenu.hears('🔐🔐🔐АДМИНКА🔐🔐🔐', (ctx) =>
	ctx.navigator.goto('Admin'),
);
SceneMainMenu.hears(
	'Узнай, чем тебе будет полезен наш бот✨',
	(ctx) => ctx.navigator.goto('About'),
);
SceneMainMenu.hears('Основные правила', (ctx) =>
	ctx.navigator.goto('FeedbackRules'),
);
SceneMainMenu.hears('Виды обратной связи', (ctx) =>
	ctx.navigator.goto('FeedbackModels'),
);
