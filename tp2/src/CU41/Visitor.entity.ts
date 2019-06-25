import { PrimaryGeneratedColumn, OneToMany, Entity, Column } from 'typeorm';
import { Disponibility } from './Disponibility.entity';
import { TimeWindow } from './TimeWindow.entity';

@Entity()
export class Visitor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column()
  phoneNumber: string;
  @OneToMany(type => TimeWindow, timeWindows => timeWindows.visitor)
  timeWindows: TimeWindow[];
}
