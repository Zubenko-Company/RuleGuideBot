import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
	type: 'mongodb',
	host: 'mongo',
	port: 27017,
	database: 'RuleGuideBot',
	synchronize: true,
	logging: false,
	entities: [__dirname + '/models/entity/*.ts'],
	migrations: [],
	subscribers: [],
});
