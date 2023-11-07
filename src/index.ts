import { Telegraf } from 'telegraf';
import { Config } from './config/config';

const bot = new Telegraf(Config.BOT_TOKEN);

bot.command('test', (ctx) => {
	console.log(ctx.chat.id);
	console.log(ctx.message.message_thread_id);
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
