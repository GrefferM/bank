import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column
} from "typeorm";
import { Account } from "./Account";

@Entity()
export class AccountType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column({
    nullable: false
  })
  debit: boolean;

  @OneToMany((type) => Account, (account) => account.type)
  accounts: Account[];
}
