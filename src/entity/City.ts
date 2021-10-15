import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, Column, BaseEntity } from "typeorm";
import { Region } from "./Region";
import { User } from "./User";

@Entity()
export class City extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(type => Region, {
    nullable: false
  })
  region: Region;

  @OneToMany((type) => User, (user) => user.city)
  users: User[];
}
