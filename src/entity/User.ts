import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn
} from "typeorm";
import { City } from "./City";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false
  })
  name: string;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column({
    nullable: false
  })
  address: string;

  @ManyToOne(type => City, (city) => city.users, {
    nullable: false
  })
  @JoinColumn()
  city: City;
}
