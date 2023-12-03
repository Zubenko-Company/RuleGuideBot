import { Markup, Scenes } from 'telegraf';
import { InformerContext } from '@view/context';

export const SceneMainMenu =
	new Scenes.BaseScene<InformerContext>('mainMenu');

SceneMainMenu.enter(async (ctx) => {
	const isUserAdmin = await ctx.withUser((u) => u.isAdmin);

	await ctx.reply(
		'ВЫБИРАЕМ',
		Markup.keyboard([
			['Правила донесения Обратной связи'],
			['4 модели Обратной связи'],
			['Выбери тип ситуации для Обратной связи'],
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
	(ctx) => ctx.navigator.goto('FeedbackRules'),
);
SceneMainMenu.hears('Правила донесения Обратной связи', (ctx) =>
	ctx.navigator.goto('FeedbackRules'),
);
SceneMainMenu.hears(
	'Выбери тип ситуации для Обратной связи',
	(ctx) => ctx.navigator.goto('Search'),
);
SceneMainMenu.hears('4 модели Обратной связи', (ctx) =>
	ctx.navigator.goto('FeedbackModels'),
);
