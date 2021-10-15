import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, BaseEntity } from "typeorm";
import { City } from "./City";

@Entity()
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @OneToOne(type => City, {
    nullable: false
  })
  @JoinColumn()
  city: City;
}
