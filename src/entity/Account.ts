import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
  ManyToOne
} from "typeorm";
import { AccountType } from "./AccountType";
import { User } from "./User";
import { Employee } from "./Employee";

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => AccountType, (type) => type.accounts, {
    nullable: false
  })
  @JoinColumn()
  type: AccountType;

  @OneToOne(type => User, {
    nullable: false
  })
  @JoinColumn()
  user: User;

  @OneToOne(type => Employee, {
    nullable: false
  })
  @JoinColumn()
  employee: Employee;

  @Column('float8', {
    nullable: false
  })
  balance: number;

  @Column('timestamp', {
    default: new Date()
  })
  created: Date;
}
