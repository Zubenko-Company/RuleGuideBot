import { InformerContext } from '@view/context';
import { Composer, Scenes } from 'telegraf';
import * as S from './index';

export const SCENES = {
	FeedbackRules: S.SceneFeedbackRules,
	FeedbackModels: S.SceneFeedbackModels,
	MainMenu: S.SceneMainMenu,
	Agreement: S.SceneAgreement,
	Admin: S.SceneAdmin,
	MessageConstructor: S.SceneMessageConstructor,
} as const;

export const createStage = () => {
	const stage = new Scenes.Stage<InformerContext>(
		Object.values(SCENES),
		{
			default: S.SceneMainMenu.id,
		},
	);

	for (const [sceneName, scene] of Object.entries(SCENES)) {
		stage.use(
			Composer.optional(async (ctx) => {
				const userCurrentMenu = await ctx.withUser(
					(u) => u.currentMenu,
				);

				if (userCurrentMenu !== sceneName) {
					return false;
				}

				return true;
			}, scene.middleware()),
		);
	}
	return stage;
};
