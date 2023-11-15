import { Markup, Scenes } from 'telegraf';
import SceneFeedbackModels from './feedbackModels/feedbackModels';
import SceneFeedbackRules from './feedbackTypes/feedbackRules';

const SceneMainMenu = new Scenes.BaseScene<Scenes.SceneContext>(
	'mainMenu',
);

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

export default SceneMainMenu;
