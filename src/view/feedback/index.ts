import { Markup, Scenes } from 'telegraf';
import { MODELS } from '@models/all';
import * as R from 'remeda';
import { FeedbackPrettify } from '@viewmodel/all';
import { InformerContext } from '@view/context';

export const SceneFeedbackModels =
	new Scenes.BaseScene<InformerContext>('feedbackModels');

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
	ctx.navigator.goto('MainMenu'),
);
