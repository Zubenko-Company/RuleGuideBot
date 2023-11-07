import { Markup, Telegraf } from 'telegraf';
import { Config } from './config/config';
import { ANSWER } from './data/answers';
import { MESSAGES } from './data/messages';

const bot = new Telegraf(Config.BOT_TOKEN);

bot.start((ctx) => {
	return ctx.reply(
		MESSAGES.agreementOffer,
		Markup.keyboard([[ANSWER.agree]])
			.oneTime()
			.resize(),
	);
});

bot.hears(ANSWER.agree, (ctx) =>
	ctx.reply(MESSAGES.agreementAccept),
);

bot.command('test', (ctx) => {
	console.log(ctx.chat.id);
	console.log(ctx.message.message_thread_id);
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
