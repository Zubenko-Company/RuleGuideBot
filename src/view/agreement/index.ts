import { Markup, Scenes } from 'telegraf';
import { InformerContext } from '@view/context';

export const SceneAgreement =
	new Scenes.BaseScene<InformerContext>('agreement');

SceneAgreement.enter(async (ctx) => {
	await ctx.reply(
		'Разрешить отправку уведомлений о новостях?',
		Markup.keyboard([['Я согласен!']]).resize(),
	);
});

SceneAgreement.hears('Я согласен!', async (ctx) => {
	console.log('Новый пользователь принял соглашение');

	await ctx.withUser((u) => (u.isAgreed = true));

	await ctx.reply(
		'Спасибо! Теперь вы будете получать уведомления о новостях.',
	);
	ctx.navigator.goto('MainMenu');
});
