import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hobbie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    hobbieName: string;

    @Column()
    hobbieDescription: string;

    @ManyToOne(() => User, (user) => user.hobbies)
    user: User;
}
