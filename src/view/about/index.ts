import { Markup, Scenes } from 'telegraf';
import { InformerContext } from '@view/context';
import { ABOUT } from '@models/about/data';

export const SceneAbout = new Scenes.BaseScene<InformerContext>(
	'about',
);

SceneAbout.enter(async (ctx) => {
	await ctx.reply(
		'Выберите пункт для подробного ознакомления',
		Markup.keyboard([
			['Задачи Чат-бота'],
			['Что такое Обратная связь?'],
			['Для чего давать Обратную связь?'],
			['Назад'],
		]).resize(),
	);
});

SceneAbout.hears('Задачи Чат-бота', (ctx) => {
	ctx.reply(ABOUT.tasks);
});

SceneAbout.hears('Что такое Обратная связь?', (ctx) => {
	ctx.reply(ABOUT.explanation);
});

SceneAbout.hears('Для чего давать Обратную связь?', (ctx) => {
	ctx.reply(ABOUT.reasons);
});

SceneAbout.hears('Назад', (ctx) =>
	ctx.navigator.goto('MainMenu'),
);
