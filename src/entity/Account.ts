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
  id: number;

  @ManyToOne(type => AccountType, {
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

  @Column('money')
  balance: number;

  @Column('timestamp', {
    default: new Date()
  })
  created: Date;
}
