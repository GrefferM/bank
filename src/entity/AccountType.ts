import { 
  Entity, 
  PrimaryGeneratedColumn, 
  OneToMany, 
  Column, 
  BaseEntity 
} from "typeorm";
import { Account } from "./Account";

@Entity()
export class AccountType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('boolean')
  debit: boolean;

  @OneToMany((type) => Account, (account) => account.type)
  accounts: Account[];
}
