import { Markup, Scenes } from 'telegraf';
import { SceneMainMenu } from '@view/main';
import { User } from '@models/entity/User';
import { AppDataSource } from 'src/data-source';

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

	const userRepository = AppDataSource.getRepository(User);
	const existedUser = await userRepository.findBy({
		chatId: ctx.from.id,
	});

	if (existedUser.length === 0) {
		const user = new User();

		user.lastName = ctx.from.last_name ?? '';
		user.chatId = ctx.from.id;
		user.firstName = ctx.from.first_name;
		user.is_bot = ctx.from.is_bot;
		user.isAdmin = false;
		user.isPremium = ctx.from.is_premium ?? false;
		user.userName = ctx.from.username ?? 'Гость';

		await userRepository.save(user);
	}

	await ctx.reply(
		'Спасибо! Теперь вы будете получать уведомления о новостях.',
	);
	ctx.scene.enter(SceneMainMenu.id);
});
