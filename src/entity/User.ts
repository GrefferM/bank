import { 
  Entity, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  Column
} from "typeorm";
import { City } from "./City";

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
  city: City;
}
