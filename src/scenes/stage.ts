import { Scenes } from 'telegraf';
import SceneFeedbackModels from './feedbackModels/feedbackModels';
import SceneMainMenu from './mainMenu';
import SceneAgreement from './sceneAgreement';

const SCENES = [
	SceneFeedbackModels,
	SceneMainMenu,
	SceneAgreement,
] as const;

export const STAGE = new Scenes.Stage<Scenes.SceneContext>(
	SCENES,
	{ default: SceneMainMenu.id },
);

for (const scene of SCENES) {
	STAGE.use(scene.middleware());
}
