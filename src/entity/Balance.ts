import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Balance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float8', {
    nullable: false
  })
  amount: number;

  @Column({
    nullable: false
  })
  debt: boolean;
}
