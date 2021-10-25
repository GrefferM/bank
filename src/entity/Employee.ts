import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  Column
} from "typeorm";
import { City } from "./City";
import { Account } from "./Account";
import { Obligation } from "./Obligation";

@Entity()
export class Employee {
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

  @OneToOne(type => City, {
    nullable: false
  })
  @JoinColumn()
  city: City;

  @OneToMany((type) => Account, (account) => account.employee)
  accounts: Account[];

  @OneToMany((type) => Obligation, (obligation) => obligation.employee)
  obligations: Obligation[];
}
