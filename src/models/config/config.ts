import dotenv from 'dotenv';
dotenv.config();

export class Config {
	static BOT_TOKEN = process.env.BOT_TOKEN as string;
	static ADMIN: string[] = JSON.parse(
		process.env.ADMIN as string,
	) as string[];
}

const validate = () => {
	if (!Config.BOT_TOKEN) {
		throw new Error(
			'Вы не установили BOT_TOKEN поле в .env, выполните команду `cp .env.dist .env` и заполните поле BOT_TOKEN',
		);
	}
};

validate();
