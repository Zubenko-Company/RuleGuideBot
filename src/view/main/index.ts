import { Markup, Scenes } from 'telegraf';
import { SceneFeedbackModels } from '@view/feedback';
import { SceneFeedbackRules } from '@view/rules';

export const SceneMainMenu =
	new Scenes.BaseScene<Scenes.SceneContext>('mainMenu');

SceneMainMenu.enter(async (ctx) => {
	await ctx.reply(
		'ВЫБИРАЕМ',
		Markup.keyboard([
			['Основные правила'],
			['Виды обратной связи'],
		]).resize(),
	);
});

SceneMainMenu.hears('Основные правила', (ctx) =>
	ctx.scene.enter(SceneFeedbackRules.id),
);
SceneMainMenu.hears('Виды обратной связи', (ctx) =>
	ctx.scene.enter(SceneFeedbackModels.id),
);
