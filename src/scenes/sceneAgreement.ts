import { Markup, Scenes } from 'telegraf';
import { MESSAGES } from '../data/messages';
import { ANSWER } from '../data/answers';
import SceneMainMenu from './mainMenu';

const SceneAgreement = new Scenes.BaseScene<Scenes.SceneContext>(
	'agreement',
);

SceneAgreement.enter(async (ctx) => {
	await ctx.reply(
		MESSAGES.agreementOffer,
		Markup.keyboard([[ANSWER.agree]]).resize(),
	);
});

SceneAgreement.hears(ANSWER.agree, (ctx) => {
	ctx.reply(MESSAGES.agreementAccept);
	ctx.scene.enter(SceneMainMenu.id);
});

export default SceneAgreement;
