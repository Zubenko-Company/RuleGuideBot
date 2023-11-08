import { Markup, Scenes } from 'telegraf';

const scene = 'feedbackModels';

const feedbackModelsScene =
	new Scenes.BaseScene<Scenes.SceneContext>(scene);

feedbackModelsScene.enter(async (ctx) => {
	await ctx.reply(
		'ВЫБИРАЕМe',
		Markup.keyboard([['бутер'], ['Назад']])
			.oneTime()
			.resize(),
	);
});

feedbackModelsScene.hears('бутер', (ctx) =>
	ctx.reply('нажал бутер'),
);
feedbackModelsScene.hears('Назад', (ctx) => ctx.scene.leave());

export default {
	scene: feedbackModelsScene,
	name: scene,
};
