import { Markup, Scenes } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { SceneMainMenu } from '@view/main';
import { MODELS } from '@models/all';
import * as R from 'remeda';
import { FeedbackPrettify } from '@viewmodel/all';

export const SceneFeedbackModels =
	new Scenes.BaseScene<SceneContext>('feedbackModels');

SceneFeedbackModels.enter((ctx) =>
	ctx.reply(
		'Выберите модель, чтобы подробнее ознакомится с ней📋📋📋',
		Markup.keyboard([
			...R.chunk(
				MODELS.map((model) => 'Модель ' + model.name),
				2,
			),
			['Назад'],
		]).resize(),
	),
);

MODELS.forEach((model) => {
	SceneFeedbackModels.hears('Модель ' + model.name, (ctx) =>
		ctx.replyWithMarkdownV2(FeedbackPrettify.prettify(model)),
	);
});

SceneFeedbackModels.hears('Назад', (ctx) =>
	ctx.scene.enter(SceneMainMenu.id),
);
