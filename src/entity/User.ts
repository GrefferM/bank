import { 
  Entity, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  Column,
  JoinColumn
} from "typeorm";
import { City } from "./City";
import { Obligation } from "./Obligation";
import { Operation } from "./Operation";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @ManyToOne(type => City, (city) => city.users, {
    nullable: false
  })
  @JoinColumn()
  city: City;

  @ManyToOne(type => Obligation, (obligation) => obligation.user, {
    nullable: false
  })
  obligation: Obligation;

  @ManyToOne(type => Operation, (operation) => operation.payer, {
    nullable: false
  })
  payer: Operation;

  @ManyToOne(type => Operation, (operation) => operation.recipient, {
    nullable: false
  })
  recipient: Operation;
}
