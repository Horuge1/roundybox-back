import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    username: string;
    
    @Column("text")
    email: string;
    
    @Column("text", { select: false })
    password: string;

    @Column('boolean', { default: true })
    isActive: boolean;

    @Column('text', { nullable: true })
    refreshToken: string;
}
