import { AppDataSource } from 'src/data-source';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	chatId: number;

	@Column()
	isBot: boolean;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	userName: string;

	@Column()
	isPremium: boolean;

	public static async create(
		options: Omit<InstanceType<typeof User>, 'id'>,
	): Promise<User> {
		const userRepository = AppDataSource.getRepository(User);

		const alreadyExistingUser = await this.find(options);
		if (alreadyExistingUser) {
			console.error('Пользователь уже существует');
			return alreadyExistingUser;
		}

		const user = new User();

		user.lastName = options.lastName;
		user.chatId = options.chatId;
		user.firstName = options.firstName;
		user.isBot = options.isBot;
		user.isPremium = options.isPremium;
		user.userName = options.userName;

		const createdUser = await userRepository.save(user);

		return createdUser;
	}

	public static async find(options: {
		chatId: number;
	}): Promise<User | undefined> {
		const userRepository = AppDataSource.getRepository(User);
		const user = await userRepository.findOneBy({
			chatId: options.chatId,
		});

		if (!user) {
			return undefined;
		}

		return user;
	}
}
