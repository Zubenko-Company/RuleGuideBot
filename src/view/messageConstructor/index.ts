import { Markup, Scenes } from 'telegraf';
import { InformerContext } from '@view/context';
import { User } from '@models/all';
import * as fs from 'fs';
import { cwd } from 'process';

export const SceneMessageConstructor =
	new Scenes.BaseScene<InformerContext>('messageConstructor');

SceneMessageConstructor.enter(async (ctx) => {
	await ctx.reply(
		'Отправьте сообщение, которое вы хотите разослать',
		Markup.keyboard([['Отмена']]).resize(),
	);
});
SceneMessageConstructor.hears('Отмена', (ctx) => {
	ctx.navigator.goto('Admin');
});
SceneMessageConstructor.on('text', async (ctx) => {
	await ctx.replyWithDocument({
		source: fs.createReadStream(
			cwd() + '/src/media/images/samin.gif',
		),
		filename: 'sure.gif',
	});

	await ctx.reply('итоговый вариант:');
	await ctx.reply(ctx.message.text, {
		parse_mode: 'MarkdownV2',
	});

	await ctx.reply(
		ctx.message.text,
		Markup.inlineKeyboard([
			Markup.button.callback('Разослать💀', 'да'),
		]),
	);
});

SceneMessageConstructor.action('да', async (ctx) => {
	if (!ctx.callbackQuery.message) {
		return;
	}
	await ctx.editMessageReplyMarkup({
		inline_keyboard: [],
	});

	const users = await User.find({
		where: { isAgreed: true, isBlocked: false },
	});

	for (const user of users) {
		try {
			await ctx.telegram.sendMessage(
				user.chatId,
				(ctx.callbackQuery.message as any).text,
				{ parse_mode: 'MarkdownV2' },
			);
		} catch {
			console.log('user ' + user.userName + ' blocked bot');
			user.isBlocked = true;
			await user.save();
		}
	}

	await ctx.navigator.goto('Admin');
});
