import { Markup, Scenes } from 'telegraf';
import { MODELS } from '@models/all';
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

SceneSearch.hears('Узнать алгоритм действий', (ctx) => {
	return ctx.navigator.goto('Algoritm');
});

SceneSearch.hears(
	'Похоже, у меня другая ситуация( Назад',
	(ctx) => ctx.navigator.goto('Search'),
);

SceneSearch.hears('Назад', (ctx) =>
	ctx.navigator.goto('MainMenu'),
);
