import { Config } from '@models/all';
import { SCENES } from '@view/createStage';
import {
	Entity,
	Column,
	BaseEntity,
	ObjectIdColumn,
	ObjectId,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
	@ObjectIdColumn()
	id: ObjectId;

	@Column({ unique: true })
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

	@Column()
	isBlocked: boolean;

	@Column('text')
	currentMenu: keyof typeof SCENES;

	@Column('text', { nullable: true, default: null })
	currentModel: string | null;

	@Column()
	public created_at: Date;

	@Column({ default: 0 })
	feedBackStep: number;

	private static idsQueue = new Map<number, Promise<User>>();

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
			| 'currentMenu'
		>,
	): Promise<User> {
		const alreadyExistingUser = await this.findByChatId(options);

		if (alreadyExistingUser) {
			alreadyExistingUser.isBlocked = false;
			await alreadyExistingUser.save();
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
			isBlocked: false,
			currentMenu: options.currentMenu,
			created_at: new Date(),
		});

		const existedUser = User.idsQueue.get(options.chatId);
		if (existedUser) {
			return await existedUser;
		}
		const pendingUserSave = user.save();
		User.idsQueue.set(options.chatId, pendingUserSave);
		console.log(
			'user created @' + (await pendingUserSave).userName,
		);

		return await pendingUserSave;
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
