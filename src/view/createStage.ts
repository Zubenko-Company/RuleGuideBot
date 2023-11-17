import { Scenes } from 'telegraf';
import S from './index';

const SCENES = [
	S.SceneFeedbackRules,
	S.SceneFeedbackModels,
	S.SceneMainMenu,
	S.SceneAgreement,
] as const;

export const createStage = () => {
	const stage = new Scenes.Stage<Scenes.SceneContext>(SCENES, {
		default: S.SceneMainMenu.id,
	});

	for (const scene of SCENES) {
		stage.use(scene.middleware());
	}
	return stage;
};
