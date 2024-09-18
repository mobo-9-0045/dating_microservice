import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Certificat{
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    certificatName: string

    @Column({nullable: false})
    certificatDescription: string

    @ManyToOne(() => User , (user) => user.certificats)
    user: User;
}