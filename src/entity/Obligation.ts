import { 
  Entity, 
  PrimaryGeneratedColumn, 
  OneToOne, 
  JoinColumn, 
  Column 
} from "typeorm";
import { User } from "./User";
import { Employee } from "./Employee";

@Entity()
export class Obligation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column('float4', {
    nullable: false
  })
  percent: number;

  @Column('float4', {
    nullable: false
  })
  insurance: number;

  @Column('float8', {
    nullable: false
  })
  current_amount: number;

  @Column('float8', {
    nullable: false
  })
  total_amount: number;

  @Column({
    nullable: false
  })
  finished: boolean;

  @Column({
    nullable: false
  })
  debt: boolean;

  @Column('timestamp', {
    nullable: false
  })
  next_payment: Date;

  @Column('timestamp', {
    default: new Date()
  })
  created_at: Date;

  @Column('timestamp', {
    nullable: false
  })
  finished_at: Date;
}
