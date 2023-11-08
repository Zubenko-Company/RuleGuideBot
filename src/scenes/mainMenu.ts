import { Markup, Scenes, session } from 'telegraf';
import feedbackModels from './feedbackModels/feedbackModels';

const scene = 'mainMenu';

const mainMenuScene = new Scenes.BaseScene<Scenes.SceneContext>(
	scene,
);

const stage = new Scenes.Stage<Scenes.SceneContext>([
	feedbackModels.scene,
]);

mainMenuScene.use(stage.middleware());

mainMenuScene.enter(async (ctx) => {
	await ctx.reply(
		'ВЫБИРАЕМ',
		Markup.keyboard([
			['Основные правила'],
			['Виды обратной связи'],
		])
			.oneTime()
			.resize(),
	);
});

mainMenuScene.hears('Основные правила', (ctx) =>
	ctx.reply('нажал'),
);
mainMenuScene.hears('Виды обратной связи', (ctx) =>
	ctx.scene.enter(feedbackModels.name),
);

export default {
	scene: mainMenuScene,
	name: scene,
};
