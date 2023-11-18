import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	chatId: number;

	@Column()
	is_bot: boolean;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	userName: string;

	@Column()
	isPremium: boolean;

	@Column()
	isAdmin: boolean;
}
