import dotenv from 'dotenv';
dotenv.config();

const getErrorEnvMessage = (fieldName: string) =>
	`Вы не установили ${fieldName} поле в .env, выполните команду \`cp .env.dist .env\` и заполните поле ${fieldName}`;

export class Config {
	static get BOT_TOKEN(): string {
		if (!process.env.BOT_TOKEN) {
			throw new Error(getErrorEnvMessage('BOT_TOKEN'));
		}

		return process.env.BOT_TOKEN;
	}

	static get ADMINS(): string[] {
		if (!process.env.ADMINS) {
			throw new Error(getErrorEnvMessage('ADMINS'));
		}

		return process.env.ADMINS.split(',');
	}
}
