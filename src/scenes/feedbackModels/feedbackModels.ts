import { Markup, Scenes } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import SceneMainMenu from '../mainMenu';

const SceneFeedbackModels = new Scenes.BaseScene<SceneContext>(
	'feedbackModels',
);

SceneFeedbackModels.enter(async (ctx) => {
	await ctx.reply(
		'ВЫБИРАЕМe',
		Markup.keyboard([['бутер'], ['Назад']]).resize(),
	);
});

SceneFeedbackModels.hears('бутер', (ctx) =>
	ctx.reply('нажал бутер'),
);
SceneFeedbackModels.hears('Назад', (ctx) =>
	ctx.scene.enter(SceneMainMenu.id),
);

export default SceneFeedbackModels;
