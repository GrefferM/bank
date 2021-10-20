import { 
  Entity, 
  PrimaryGeneratedColumn, 
  OneToMany, 
  Column
} from "typeorm";
import { Operation } from "./Operation";

@Entity()
export class OperationType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column('float4', {
    nullable: false
  })
  commission: number;

  @OneToMany((type) => Operation, (operation) => operation.type)
  operations: Operation[];
}
