import { Markup, Scenes } from 'telegraf';
import { InformerContext } from '@view/context';
import * as fs from 'fs';
import { createInformerApi } from 'informer-client';

export const SceneAgreement =
	new Scenes.BaseScene<InformerContext>('agreement');

SceneAgreement.enter(async (ctx) => {
	await ctx.reply(
		'Добро пожаловать! ☺️\n\n'+
		'Этот чат-бот — ваш помощник в повседневной работе с сотрудниками. Он подскажет, какой вариант обратной связи и в каких ситуациях эффективнее применять.\n\n'+
		'Удачи! ✨',
	);

	await ctx.replyWithVideo({
		source: fs.createReadStream(
			__dirname + '/../../media/video/intro.mp4',
		),
	});

	await ctx.reply(
		'Разрешить отправку уведомлений о новостях?',
		Markup.keyboard([['Я согласен!']]).resize(),
	);
});

SceneAgreement.hears('Я согласен!', async (ctx) => {
	await ctx.withUser((u) => (u.isAgreed = true));

	// const { sendMessage } = createInformerApi({url: process.env.INFORMER_URL!, token: process.env.INFORMER_KEY!});

	// await sendMessage({
	// 	topic: 'Новенькие',
	// 	message: 'Добавлен новый пользователь @' + ctx.from.username
	// })

	await ctx.reply(
		'Спасибо! Теперь вы будете получать уведомления о новостях.',
	);
	ctx.navigator.goto('MainMenu');
});
