import { Input, Markup, Scenes } from 'telegraf';
import { InformerContext } from '@view/context';
import * as fs from 'fs';

export const SceneAgreement =
	new Scenes.BaseScene<InformerContext>('agreement');

SceneAgreement.enter(async (ctx) => {
	await ctx.reply(
		'Добро пожаловать!\n' +
			'Этот чат-бот — ваш помощник в повседневной работе с сотрудниками.' +
			'Он подскажет, какой вариант обратной связи и в каких ситуациях эффективнее применять. Удачи!\n',
	);

	await ctx.reply(
		'Разрешить отправку уведомлений о новостях?',
		Markup.keyboard([['Я согласен!']]).resize(),
	);
});

SceneAgreement.hears('Я согласен!', async (ctx) => {
	await ctx.withUser((u) => (u.isAgreed = true));
	await ctx.replyWithVideoNote({
		source: fs.createReadStream(
			__dirname + '/../../video/intro.mp4',
		),
	});
	await ctx.reply(
		'Спасибо! Теперь вы будете получать уведомления о новостях.',
	);
	ctx.navigator.goto('MainMenu');
});
