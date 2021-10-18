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

  @Column('float4')
  percent: number;

  @Column('float4')
  insurance: number;

  @Column('money')
  current_amount: number;

  @Column('money')
  total_amount: number;

  @Column()
  finished: boolean;

  @Column()
  debt: boolean;

  @Column('timestamp')
  next_payment: Date;

  @Column('timestamp', {
    default: new Date()
  })
  created_at: Date;

  @Column('timestamp')
  finished_at: Date;
}
