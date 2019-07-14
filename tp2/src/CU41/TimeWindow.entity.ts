import {
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  getConnection,
} from 'typeorm';
import { Disponibility } from './Disponibility.entity';
import { Visitor } from './Visitor.entity';

@Entity()
export class TimeWindow {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  beginningDate: String;
  @OneToMany(type => Disponibility, disponibilies => disponibilies.timeWindow)
  disponibilities: Disponibility[];
  @ManyToOne(type => Visitor, visitor => visitor.timeWindows)
  visitor: Visitor;
}
