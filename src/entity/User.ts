import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Column
} from "typeorm";
import { City } from "./City";
import { Account } from "./Account";
import { Obligation } from "./Obligation";
import { Operation } from "./Operation";

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

  @OneToMany((type) => Account, (account) => account.user)
  accounts: Account[];

  @OneToMany((type) => Obligation, (obligation) => obligation.user)
  obligations: Obligation[];

  @OneToMany((type) => Operation, (operation) => operation.payer)
  payer_operations: Operation[];

  @OneToMany((type) => Operation, (operation) => operation.recipient)
  recipient_operations: Operation[];
}
