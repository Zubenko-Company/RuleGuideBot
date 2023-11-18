import { Markup, Scenes } from 'telegraf';
import { SceneMainMenu } from '@view/main';
import { User } from '@models/all';

export const SceneAgreement =
	new Scenes.BaseScene<Scenes.SceneContext>('agreement');

SceneAgreement.enter(async (ctx) => {
	await ctx.reply(
		'Разрешить отправку уведомлений о новостях?',
		Markup.keyboard([['Я согласен!']]).resize(),
	);
});

SceneAgreement.hears('Я согласен!', async (ctx) => {
	console.log('Новый пользователь принял соглашение');
	console.log(ctx.from);

	await User.create({
		lastName: ctx.from.last_name ?? '',
		chatId: ctx.from.id,
		firstName: ctx.from.first_name,
		isBot: ctx.from.is_bot,
		isPremium: ctx.from.is_premium ?? false,
		userName: ctx.from.username ?? 'Гость',
	});

	await ctx.reply(
		'Спасибо! Теперь вы будете получать уведомления о новостях.',
	);
	ctx.scene.enter(SceneMainMenu.id);
});
