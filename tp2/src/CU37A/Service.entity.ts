import { Report } from './Report.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nom: string;
  @Column()
  description: string;
  @Column()
  estActif: Boolean;
  @OneToOne(type => Report)
  @JoinColumn()
  report: Report;
}
