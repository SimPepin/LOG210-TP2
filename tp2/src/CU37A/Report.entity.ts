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
import { Template } from './Template.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  coordinatorId: number;
  @OneToOne(type => Service)
  @JoinColumn()
  service: Service;

  @OneToOne(type => Template)
  @JoinColumn()
  template: Template;

  @OneToOne(type => ObservationNote)
  @JoinColumn()
  observationsNote: ObservationNote;
}
