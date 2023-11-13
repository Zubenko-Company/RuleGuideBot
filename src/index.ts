import { Markup, Scenes, Telegraf, session } from 'telegraf';
import { Config } from './config/config';
import { ANSWER } from './data/answers';
import { MESSAGES } from './data/messages';
import SceneMainMenu from './scenes/mainMenu';
import { STAGE } from './scenes/stage';

const bot = new Telegraf<Scenes.SceneContext>(Config.BOT_TOKEN);

bot.use(session());
bot.use(STAGE.middleware());

bot.start((ctx) => {
	return ctx.reply(
		MESSAGES.agreementOffer,
		Markup.keyboard([[ANSWER.agree]])
			.oneTime()
			.resize(),
	);
});

bot.hears(ANSWER.agree, (ctx) => {
	ctx.scene.enter(SceneMainMenu.id);
	return ctx.reply(MESSAGES.agreementAccept);
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
