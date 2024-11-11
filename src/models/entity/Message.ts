import {
	Entity,
	Column,
	BaseEntity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Message extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	content: string;

	@Column()
	messageIds: string;

	@Column()
	sendetAt: Date;
}
