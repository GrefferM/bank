import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Balance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('money')
  amount: number;

  @Column('boolean')
  debt: boolean;

  @Column('timestamp')
  created_at: Date;
}
