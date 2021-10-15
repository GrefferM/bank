import { 
  Entity, 
  PrimaryGeneratedColumn, 
  OneToOne, 
  JoinColumn, 
  ManyToOne, 
  Column, 
  BaseEntity 
} from "typeorm";
import { OperationType } from "./OperationType";
import { User } from "./User";

@Entity()
export class Operation extends BaseEntity {
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
  type: OperationType;

  @Column('boolean')
  finished: boolean;

  @Column('timestamp')
  created: Date;
}