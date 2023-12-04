import { Markup, Scenes } from 'telegraf';
import { MODELS } from '@models/all';
import * as R from 'remeda';
import { SearchPrettify } from '@viewmodel/all';
import { InformerContext } from '@view/context';

export const SceneSearch = new Scenes.BaseScene<InformerContext>(
	'Search',
);

SceneSearch.enter((ctx) =>
	ctx.reply(
		'Выберите модель, чтобы подробнее ознакомится с ней📋',
		Markup.keyboard([
			...MODELS.map((model) => [model.tag]),
			['Назад'],
		]).resize(),
	),
);

MODELS.forEach((model) => {
	SceneSearch.hears(model.tag, (ctx) =>
		ctx.replyWithMarkdownV2(
			'Модель: ' + model.name + SearchPrettify.prettify(model),
		),
	);
});

SceneSearch.hears('Назад', (ctx) =>
	ctx.navigator.goto('MainMenu'),
);
