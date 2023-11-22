import { Markup, Scenes } from 'telegraf';
import { InformerContext } from '@view/context';

export const SceneAdmin = new Scenes.BaseScene<InformerContext>(
	'admin',
);

SceneAdmin.enter(async (ctx) => {
	await ctx.reply('Придумайте');
});

SceneAdmin.on('message', (ctx) => {
	ctx.reply('ghblevfkb');
});
