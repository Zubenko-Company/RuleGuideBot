import 'reflect-metadata';
import { Telegraf, session } from 'telegraf';
import { Config } from '@models/all';
import { createStage } from '@view/createStage';
import { SceneAgreement } from '@view/agreement';
import { AppDataSource } from './data-source';
import { InformerContext } from '@view/context';

(async () => {
	await AppDataSource.initialize();
	console.log('Новое подключение)');

	const bot = new Telegraf(Config.BOT_TOKEN, {
		contextType: InformerContext,
	});
	bot.use(session());

	const stage = createStage();
	bot.use(stage.middleware());

	bot.start((ctx) => ctx.scene.enter(SceneAgreement.id));
	bot.launch();

	bot.catch((err) => console.log(err));

	// Enable graceful stop
	process.once('SIGINT', () => bot.stop('SIGINT'));
	process.once('SIGTERM', () => bot.stop('SIGTERM'));
})();
