import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Template {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  numberLine: number;
  @Column()
  numberColumn: number;
  @Column()
  header: string;
  @Column()
  format: string;
  @Column()
  style: string;
  @Column()
  state: string;
}
