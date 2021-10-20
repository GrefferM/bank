import { 
  Entity, 
  PrimaryGeneratedColumn, 
  OneToOne, 
  JoinColumn, 
  Column
} from "typeorm";
import { City } from "./City";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false
  })
  name: string;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column({
    nullable: false
  })
  address: string;

  @OneToOne(type => City, {
    nullable: false
  })
  @JoinColumn()
  city: City;
}
