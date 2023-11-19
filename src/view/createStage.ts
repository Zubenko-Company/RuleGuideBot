import { InformerContext } from '@view/context';
import { Scenes } from 'telegraf';
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

	for (const scene of Object.values(SCENES)) {
		stage.use(scene.middleware());
	}
	return stage;
};
