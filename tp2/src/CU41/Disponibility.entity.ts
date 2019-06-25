import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { TimeWindow } from './TimeWindow.entity';

@Entity()
export class Disponibility {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  begin: Date;
  @Column()
  end: Date;
  @Column()
  dayOfWeek: string;

  @Column()
  currentState: string;

  @ManyToOne(type => TimeWindow, timeWindow => timeWindow.disponibilities)
  timeWindow: TimeWindow;
}
