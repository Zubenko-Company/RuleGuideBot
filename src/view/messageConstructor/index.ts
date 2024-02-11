import { Markup, Scenes } from 'telegraf';
import { InformerContext } from '@view/context';
import { User } from '@models/all';

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
	await ctx.reply('вот так вот?');

	await ctx.reply(
		ctx.message.text,
		Markup.inlineKeyboard([
			Markup.button.callback('Разослать💀', 'да'),
		]),
	);

	await ctx.reply(
		'https://media.tenor.com/WB9lrgDX2m8AAAAd/samin.gif',
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
			);
		} catch {
			console.log('user ' + user.userName + ' blocked bot');
			user.isBlocked = true;
			await user.save();
		}
	}

	await ctx.navigator.goto('Admin');
});
