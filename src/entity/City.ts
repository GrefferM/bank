import { 
  Entity, 
  PrimaryGeneratedColumn, 
  OneToMany, 
  ManyToOne, 
  Column,
  JoinColumn
} from "typeorm";
import { Region } from "./Region";
import { User } from "./User";
import { Employee } from "./Employee";

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @ManyToOne(type => Region, (region) => region.cities, {
    nullable: false
  })
  @JoinColumn()
  region: Region;

  @OneToMany((type) => User, (user) => user.city)
  users: User[];

  @OneToMany((type) => Employee, (employee) => employee.city)
  employes: Employee[];
}
