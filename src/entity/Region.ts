import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  OneToMany
} from "typeorm";
import { City } from './City';

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @OneToMany((type) => City, (cities) => cities.region)
  cities: City[];
}
