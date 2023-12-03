import { Markup, Scenes } from 'telegraf';
import { InformerContext } from '@view/context';
import { User } from '@models/all';
import { MoreThan } from 'typeorm';

export const SceneAdmin = new Scenes.BaseScene<InformerContext>(
	'admin',
);

//TODO check

SceneAdmin.enter(async (ctx) => {
	await ctx.reply(
		'Придумайте',
		Markup.keyboard([
			['Создать рассылку'],
			['Показать статистику'],
			['Назад'],
		]).resize(),
	);
});
SceneAdmin.hears('Создать рассылку', (ctx) => {
	ctx.navigator.goto('MessageConstructor');
});
SceneAdmin.hears('Показать статистику', async (ctx) => {
	const lastMonthDate = new Date();
	lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

	const usersLastMonth = await User.count({
		where: {
			created_at: MoreThan(lastMonthDate),
			isBlocked: false,
		},
	});
	const usersCountAlltime = await User.count();
	const bannedUsers = await User.count({
		where: {
			isBlocked: true,
		},
	});

	await ctx.reply(
		'📈 Общее кол-во пользователей: ' +
			usersCountAlltime +
			'\n📈 Новых пользователей за последний месяц: ' +
			usersLastMonth +
			'\n💀 Пользователей отписалось: ' +
			bannedUsers,
	);
});

SceneAdmin.hears('Назад', (ctx) =>
	ctx.navigator.goto('MainMenu'),
);
