import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Balance extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('money')
  amount: number;

  @Column('boolean')
  debt: boolean;

  @Column('timestamp')
  created_at: Date;
}
