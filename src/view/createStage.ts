import { Scenes } from 'telegraf';
import {
	SceneAgreement,
	SceneFeedbackModels,
	SceneFeedbackRules,
	SceneMainMenu,
} from './index';

const SCENES = [
	SceneFeedbackRules,
	SceneFeedbackModels,
	SceneMainMenu,
	SceneAgreement,
] as const;

export const createStage = () => {
	const stage = new Scenes.Stage<Scenes.SceneContext>(SCENES, {
		default: SceneMainMenu.id,
	});

	for (const scene of SCENES) {
		stage.use(scene.middleware());
	}
	return stage;
};
