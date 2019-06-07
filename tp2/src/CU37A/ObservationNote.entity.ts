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
  redactionStart: Date;
  @Column()
  redactionEnd: Date;
  @Column()
  correctionStart: Date;
  @Column()
  correctionEnd: Date;

  @ManyToOne(type => Report, report => report.observationsNote)
  report: Report;
}
