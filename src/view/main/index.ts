import { Markup, Scenes } from 'telegraf';
import { InformerContext } from '@view/context';

export const SceneMainMenu =
	new Scenes.BaseScene<InformerContext>('mainMenu');

SceneMainMenu.enter(async (ctx) => {
	const isUserAdmin = await ctx.withUser((u) => u.isAdmin);

	await ctx.reply(
		'Выберите опцию:',
		Markup.keyboard([
			['Что такое Обратная связь'],
			['Выберите вашу ситуацию'],
			['Правила донесения Обратной связи'],
			isUserAdmin ? ['🔐🔐🔐АДМИНКА🔐🔐🔐'] : [],
		]).resize(),
	);
});

SceneMainMenu.hears('🔐🔐🔐АДМИНКА🔐🔐🔐', async (ctx) => {
	if (!(await ctx.withUser((u) => u.isAdmin))) {
		ctx.navigator.goto('MainMenu');
	}

	return ctx.navigator.goto('Admin');
});

SceneMainMenu.hears('Что такое Обратная связь', (ctx) =>
	ctx.navigator.goto('aboutFeedback'),
);

SceneMainMenu.hears('Правила донесения Обратной связи', (ctx) =>
	ctx.navigator.goto('FeedbackRules'),
);

SceneMainMenu.hears(
	'Выберите вашу ситуацию',
	(ctx) => ctx.navigator.goto('Search'),
);
