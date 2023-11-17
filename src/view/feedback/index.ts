import { Markup, Scenes } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { SceneMainMenu } from '../main';
import { MODELS } from '@models/all';
import * as R from 'remeda';

export const SceneFeedbackModels =
	new Scenes.BaseScene<SceneContext>('feedbackModels');

SceneFeedbackModels.enter(async (ctx) => {
	await ctx.reply(
		'Выберите модель, чтобы подробнее ознакомится с ней📋📋📋',
		Markup.keyboard([
			...R.chunk(
				MODELS.map((model) => 'Модель ' + model.name),
				2,
			),
			['Назад'],
		]).resize(),
	);
});

MODELS.forEach((model) => {
	const messageRaw = [
		'\n ✏️ Ситуации для применения ✏️ \n',
		model.situations.map((sit) => `  • ${sit}`),
		'\n ✏️ Основные правила ✏️ \n',
		model.rules.map((rule) => `  • ${rule}`),
	];

	const message = messageRaw.flat().join('\n');

	SceneFeedbackModels.hears('Модель ' + model.name, (ctx) => {
		ctx.replyWithMarkdownV2(message);
	});
});

SceneFeedbackModels.hears('Назад', (ctx) => {
	ctx.scene.enter(SceneMainMenu.id);
});
