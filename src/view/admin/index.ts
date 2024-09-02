import { Markup, Scenes } from 'telegraf';
import { InformerContext } from '@view/context';
import { User } from '@models/all';
import { LessThan, MoreThan, MoreThanOrEqual } from 'typeorm';
import { Message } from '@models/entity/Message';
import * as R from 'remeda';

export const SceneAdmin = new Scenes.BaseScene<InformerContext>(
	'admin',
);

SceneAdmin.enter(async (ctx) => {
	await ctx.reply(
		'Придумайте',
		Markup.keyboard([
			['Создать рассылку'],
			['Удалить последнюю рассылку'],
			['Показать статистику'],
			['Назад'],
		]).resize(),
	);
});
SceneAdmin.hears('Создать рассылку', (ctx) => {
	ctx.navigator.goto('MessageConstructor');
});
SceneAdmin.hears('Удалить последнюю рассылку', async (ctx) => {
	const msg = (await Message.findOne({
		order: {
			sendetAt: 'DESC',
		},
	})) as Message;

	try {
		msg.messageIds.forEach(async (ids) => {
			await ctx.telegram.deleteMessage(ids.chatId, ids.msgId);
		});
	} catch (e) {
		console.log(e);
	}
});
SceneAdmin.hears('Показать статистику', async (ctx) => {
	const lastMonthDate = new Date();
	lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

	const [, usersLastMonth] = await User.findAndCount({
		where: {
			created_at: MoreThanOrEqual(lastMonthDate),
			isBlocked: false,
		},
	});
	const TotalCount = await User.count();
	const [, AgreedCount] = await User.findAndCount({
		where: { isAgreed: true },
	});
	const [, bannedUsers] = await User.findAndCount({
		where: {
			isBlocked: true,
		},
	});

	await ctx.reply(
		'👻 Всего: ' +
			TotalCount +
			'\n📈 Кол-во пользователей согласилось с правилами: ' +
			AgreedCount +
			// '\n📈 Новых пользователей за последний месяц: ' +
			// usersLastMonth +
			'\n💀 Пользователей отписалось: ' +
			bannedUsers,
	);
});

SceneAdmin.hears('Назад', (ctx) =>
	ctx.navigator.goto('MainMenu'),
);
