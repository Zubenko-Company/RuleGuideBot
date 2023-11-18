import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
	type: 'sqlite',
	database: 'usersDB.sqlite',
	synchronize: true,
	logging: false,
	entities: [__dirname + '/models/entity/*.ts'],
	migrations: [],
	subscribers: [],
});
