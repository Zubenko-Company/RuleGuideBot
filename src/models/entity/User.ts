import { Config } from '@models/all';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
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

	@Column()
	isAgreed: boolean;

	public static async createIfNotExists(
		options: Pick<
			User,
			| 'chatId'
			| 'firstName'
			| 'isAgreed'
			| 'isBot'
			| 'isPremium'
			| 'lastName'
			| 'userName'
		>,
	): Promise<User> {
		const alreadyExistingUser = await this.findByChatId(options);
		if (alreadyExistingUser) {
			return alreadyExistingUser;
		}

		const user = User.create({
			lastName: options.lastName,
			chatId: options.chatId,
			firstName: options.firstName,
			isBot: options.isBot,
			isPremium: options.isPremium,
			userName: options.userName,
			isAgreed: options.isAgreed,
		});

		return await user.save();
	}

	public static async findByChatId(options: {
		chatId: number;
	}): Promise<User | undefined> {
		const user = await User.findOneBy({
			chatId: options.chatId,
		});

		if (!user) {
			return undefined;
		}

		return user;
	}

	public get isAdmin() {
		return Config.ADMINS.includes(this.userName);
	}
}
