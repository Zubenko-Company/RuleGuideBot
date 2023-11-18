import { DataSource } from 'typeorm';
import { User } from './entity/User';

export const AppDataSource = new DataSource({
	type: 'sqlite',
	database: 'usersDB.sqlite',
	synchronize: true,
	logging: false,
	entities: [User],
	migrations: [],
	subscribers: [],
});
