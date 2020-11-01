import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, ManyToOne } from 'typeorm';

@Entity()
export class Bot {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 50 })
    description: string;

    @Column()
    createdAt:Date;

    @BeforeInsert()
    async createDate() {
        const date = new Date();
        this.createdAt = date;
    }

    @Column()
    updatedAt:Date;

    @BeforeInsert()
    async createUpdateDate() {
        const date = new Date();
        this.updatedAt = date;
    }

    @BeforeUpdate()
    async updateDate() {
        const date = new Date();
        this.updatedAt = date;
    }
    @Column()
    userId: number;

    @ManyToOne(() => User, user => user.bots,  {onDelete: 'CASCADE'})
    user: User;
}

