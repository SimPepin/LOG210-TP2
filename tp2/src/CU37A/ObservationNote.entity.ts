import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Report } from './Report.entity';

@Entity()
export class ObservationNote {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  intervenantId: number;
  @Column()
  text: string;
  @Column()
  state: string;
  @Column()
  redactionStart: string;
  @Column()
  redactionEnd: string;
  @Column()
  correctionStart: string;
  @Column()
  correctionEnd: string;

  @OneToOne(type => Report)
  @JoinColumn()
  report: Report;
}
