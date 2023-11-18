import { Markup, Scenes } from 'telegraf';
import { SceneMainMenu } from '@view/main';

export const SceneAgreement =
	new Scenes.BaseScene<Scenes.SceneContext>('agreement');

SceneAgreement.enter(async (ctx) => {
	await ctx.reply(
		'Разрешить отправку уведомлений о новостях?',
		Markup.keyboard([['Я согласен!']]).resize(),
	);
});

SceneAgreement.hears('Я согласен!', async (ctx) => {
	await ctx.reply(
		'Спасибо! Теперь вы будете получать уведомления о новостях.',
	);
	ctx.scene.enter(SceneMainMenu.id);
});
