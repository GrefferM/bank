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

  @Column()
  title: string;

  @Column('boolean')
  debit: boolean;

  @OneToMany((type) => Account, (account) => account.type)
  accounts: Account[];
}
