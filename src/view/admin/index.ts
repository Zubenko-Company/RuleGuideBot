import { Markup, Scenes } from 'telegraf';
import { InformerContext } from '@view/context';

export const SceneAdmin = new Scenes.BaseScene<InformerContext>(
	'admin',
);

SceneAdmin.enter(async (ctx) => {
	await ctx.reply(
		'Придумайте',
		Markup.keyboard([['Создать рассылку'], ['Назад']]).resize(),
	);
});

SceneAdmin.hears('Создать рассылку', (ctx) => {
	ctx.navigator.goto('MessageConstructor');
});
SceneAdmin.hears('Назад', (ctx) =>
	ctx.navigator.goto('MainMenu'),
);
