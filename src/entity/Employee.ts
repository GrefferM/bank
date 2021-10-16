import { 
  Entity, 
  PrimaryGeneratedColumn, 
  OneToOne, 
  JoinColumn, 
  Column,
  ManyToOne
} from "typeorm";
import { City } from "./City";
import { Obligation } from "./Obligation";

@Entity()
export class Employee {
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

  @OneToOne(type => City, {
    nullable: false
  })
  @JoinColumn()
  city: City;

  @ManyToOne(type => Obligation, (obligation) => obligation.user, {
    nullable: false
  })
  obligation: Obligation;
}
