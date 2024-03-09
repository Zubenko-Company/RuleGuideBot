import { InformerContext } from '@view/context';
import { sceneErrorHandler } from '@view/errorHandler';
import { Composer, Scenes } from 'telegraf';
import * as S from './index';

export const SCENES = {
	FeedbackRules: S.SceneFeedbackRules,
	FeedbackModels: S.SceneFeedbackModels,
	MainMenu: S.SceneMainMenu,
	Agreement: S.SceneAgreement,
	Admin: S.SceneAdmin,
	MessageConstructor: S.SceneMessageConstructor,
	About: S.SceneAbout,
	Search: S.SceneSearch,
	Algoritm: S.SceneAlgoritm,
	Example: S.SceneExample,
	aboutFeedback: S.SceneAboutFeedback,
} as const;

export const createStage = () => {
	const stage = new Scenes.Stage<InformerContext>(
		Object.values(SCENES),
		{
			default: S.SceneMainMenu.id,
		},
	);

	stage.use(
		Composer.compose([
			Composer.catch(sceneErrorHandler),
			Composer.dispatch(async (ctx) => {
				const userCurrentMenu = await ctx.withUser(
					(u) => u.currentMenu,
				);

				if (!SCENES[userCurrentMenu]) {
					await ctx.navigator.goto('MainMenu');
				}

				return userCurrentMenu;
			}, SCENES),
			async (ctx, next) => {
				// const userCurrentMenu = await ctx.withUser(
				// 	(u) => u.currentMenu,
				// );

				// console.log('redirect');

				// await ctx.navigator.goto(userCurrentMenu);

				return next();
			},
		]),
	);

	return stage;
};
