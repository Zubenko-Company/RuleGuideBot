import { Markup, Scenes } from 'telegraf';
import { InformerContext } from '@view/context';
import { User } from '@models/all';
import { LessThan, MoreThan, MoreThanOrEqual } from 'typeorm';

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

	const usersLastMonth = (
		await User.findAndCount({
			where: {
				created_at: MoreThanOrEqual(lastMonthDate),
				isBlocked: false,
			},
		})
	)[1];
	const usersCount = (
		await User.findAndCount({
			where: { isAgreed: true },
		})
	)[1];
	const bannedUsers = (
		await User.findAndCount({
			where: {
				isBlocked: true,
			},
		})
	)[1];

	await ctx.reply(
		'📈 Общее кол-во пользователей: ' +
			usersCount +
			'\n📈 Новых пользователей за последний месяц: ' +
			usersLastMonth +
			'\n💀 Пользователей отписалось: ' +
			bannedUsers,
	);
});

SceneAdmin.hears('Назад', (ctx) =>
	ctx.navigator.goto('MainMenu'),
);
