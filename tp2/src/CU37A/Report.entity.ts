import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Service } from './Service.entity';
import { ObservationNote } from './ObservationNote.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  coordinatorId: number;
  @OneToOne(type => Service)
  @JoinColumn()
  service: Service;

  @OneToMany(type => ObservationNote, observationNote => observationNote.report)
  observationsNote: ObservationNote[];
}
