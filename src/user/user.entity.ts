import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import { Exclude, } from "class-transformer";
import { IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { Bot } from 'src/bots/bots.entity';
import { saltRounds } from 'src/configs/bcrypt';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    firstName: string;

    @Column({ length: 50 })
    lastName: string;

    @Column({select: false})
    @Exclude()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    @Column({})
    @IsEmail({})
    email: string;
    
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

    @OneToMany(() => Bot, bots => bots.user, {cascade: true})
    bots: Bot[];
}

