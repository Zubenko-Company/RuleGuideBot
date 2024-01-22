import { Markup, Scenes } from 'telegraf';
import { InformerContext } from '@view/context';

export const SceneMainMenu =
	new Scenes.BaseScene<InformerContext>('mainMenu');

SceneMainMenu.enter(async (ctx) => {
	const isUserAdmin = await ctx.withUser((u) => u.isAdmin);

	await ctx.reply(
		'Выберите опцию',
		Markup.keyboard([
			['Узнай, чем тебе будет полезен наш бот✨'],
			['Выбери тип ситуации для Обратной связи'],
			['Правила донесения Обратной связи'],
			['4 модели Обратной связи'],
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
