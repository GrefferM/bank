import { 
  Entity, 
  PrimaryGeneratedColumn, 
  OneToMany, 
  Column, 
  BaseEntity 
} from "typeorm";
import { Operation } from "./Operation";

@Entity()
export class OperationType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('float4')
  commission: number;

  @OneToMany((type) => Operation, (operation) => operation.type)
  operations: Operation[];
}
