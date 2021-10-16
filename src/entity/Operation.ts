import { 
  Entity, 
  PrimaryGeneratedColumn, 
  OneToOne, 
  JoinColumn, 
  ManyToOne, 
  Column
} from "typeorm";
import { OperationType } from "./OperationType";
import { User } from "./User";

@Entity()
export class Operation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(type => User, {
    nullable: false
  })
  @JoinColumn()
  payer: User;

  @OneToOne(type => User, {
    nullable: false
  })
  @JoinColumn()
  recipient: User;

  @ManyToOne(type => OperationType, {
    nullable: false
  })
  @JoinColumn()
  type: OperationType;

  @Column()
  finished: boolean;

  @Column('timestamp')
  created: Date;
}
