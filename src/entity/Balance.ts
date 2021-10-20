import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Balance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('money', {
    nullable: false
  })
  amount: number;

  @Column({
    nullable: false
  })
  debt: boolean;
}
