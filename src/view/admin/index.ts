import { Composer, Markup, Scenes } from 'telegraf';
import { InformerContext } from '@view/context';

const stepHandler = new Composer<InformerContext>();

export const SceneAdmin = new Scenes.WizardScene(
	'admin',
	async (ctx) => {
		await ctx.reply(
			'Step 1',
			Markup.inlineKeyboard([
				Markup.button.url('❤️', 'http://telegraf.js.org'),
				Markup.button.callback('➡️ Next', 'next'),
			]),
		);
		return ctx.wizard.next();
	},
	stepHandler,
	async (ctx) => {
		await ctx.reply(`[${ctx.myContextProp}] Step 3.`);
		return ctx.wizard.next();
	},
	async (ctx) => {
		await ctx.reply('Step 4');
		return ctx.wizard.next();
	},
	async (ctx) => {
		await ctx.reply('Done');
		return await ctx.scene.leave();
	},
);

SceneAdmin.action('next', async (ctx) => {
	await ctx.reply('Step 2. Via inline button');
	return ctx.wizard.next();
});
