import { User } from '@models/all';
import { SCENES } from '@view/createStage';
import { Context, Scenes } from 'telegraf';

export class InformerContext extends Context {
	// Обязательное поле, требуется для расширения контекста
	public scene: Scenes.SceneContextScene<InformerContext>;

	get User() {
		const fromObj = this.from;

		if (fromObj) {
			return new Promise<User>((resolve) =>
				User.createIfNotExists({
					lastName: fromObj.last_name ?? '',
					chatId: fromObj.id,
					firstName: fromObj.first_name,
					isBot: fromObj.is_bot,
					isPremium: fromObj.is_premium ?? false,
					userName: fromObj.username ?? 'Гость',
					isAgreed: false,
					currentMenu: 'Agreement',
				}).then(resolve),
			);
		}

		throw new Error(
			'Cannot get user from message without `ctx.from`',
		);
	}

	public navigator = {
		goto: async (menu: keyof typeof SCENES) => {
			await this.scene.enter(SCENES[menu].id);
			const user = await this.User;

			user.currentMenu = menu;
			await user.save();
		},
	};
}
