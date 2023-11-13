import { Scenes, Telegraf, session } from 'telegraf';
import { Config } from './config/config';
import { ANSWER } from './data/answers';
import { STAGE } from './scenes/stage';
import SceneAgreement from './scenes/sceneAgreement';

const bot = new Telegraf<Scenes.SceneContext>(Config.BOT_TOKEN);

bot.use(session());
bot.use(STAGE.middleware());

bot.start((ctx) => {
	ctx.scene.enter(SceneAgreement.id);
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
