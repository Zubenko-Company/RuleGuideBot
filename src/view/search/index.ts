import { Markup, Scenes } from 'telegraf';
import { MODELS } from '@models/all';
import { SearchPrettify } from '@viewmodel/all';
import { InformerContext } from '@view/context';

export const SceneSearch = new Scenes.BaseScene<InformerContext>(
	'Search',
);

SceneSearch.enter((ctx) =>
	ctx.reply(
		'Выберите тип ситуации для Обратной связи сотруднику:',
		Markup.keyboard([
			...MODELS.map((model) => [model.tag]),
			['Назад'],
		]).resize(),
	),
);

MODELS.forEach((model) => {
	SceneSearch.hears(model.tag, async (ctx) => {
		const user = await ctx.withUser(
			async (u) => (u.currentModel = model.tag),
		);

		return ctx.replyWithMarkdownV2(
			model.situations,
			Markup.keyboard([
				['Узнать алгоритм действий'],
				['Похоже, у меня другая ситуация( Назад'],
			]).resize(),
		);
	});
});

// - Узнать алгоритм действий
// - Похоже, у меня другая ситуация. Назад.

SceneSearch.hears('Узнать алгоритм действий', (ctx) => {
	return ctx.navigator.goto('Algoritm');
});

// Все ясно. Назад.
// Нужен пример

// SceneSearch.hears('Нужен пример', (ctx) => {
// 	const hui = MODELS.find((el) => el.tag === activeModel);
// 	if (!hui) {
// 		throw new Error('Пустой activeModel');
// 	}
// 	return ctx.replyWithMarkdownV2(
// 		hui.example[0],
// 		Markup.keyboard([
// 			['Все ясно. Назад.'],
// 			['Нужен пример'],
// 		]).resize(),
// 	);
// });

// SceneSearch.hears('Все ясно. Назад.', (ctx) =>
// 	ctx.navigator.goto('MainMenu'),
// );

SceneSearch.hears(
	'Похоже, у меня другая ситуация( Назад',
	(ctx) => ctx.navigator.goto('Search'),
);

SceneSearch.hears('Назад', (ctx) =>
	ctx.navigator.goto('MainMenu'),
);
