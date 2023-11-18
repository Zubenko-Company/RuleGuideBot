import 'reflect-metadata';
import { Scenes, Telegraf, session } from 'telegraf';
import { Config } from '@models/all';
import { createStage } from '@view/createStage';
import { SceneAgreement } from '@view/agreement';
import { AppDataSource } from './data-source';

AppDataSource.initialize();

const bot = new Telegraf<Scenes.SceneContext>(Config.BOT_TOKEN);

bot.use(session());

const stage = createStage();
bot.use(stage.middleware());

bot.start((ctx) => ctx.scene.enter(SceneAgreement.id));

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
