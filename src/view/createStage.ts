import { User } from '@models/all';
import { InformerContext } from '@view/context';
import { Composer, Scenes } from 'telegraf';
import * as S from './index';

export const SCENES = {
	FeedbackRules: S.SceneFeedbackRules,
	FeedbackModels: S.SceneFeedbackModels,
	MainMenu: S.SceneMainMenu,
	Agreement: S.SceneAgreement,
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
				const user = await ctx.User;

				if (user.currentMenu !== sceneName) {
					return false;
				}

				return true;
			}, scene.middleware()),
		);
	}
	return stage;
};
