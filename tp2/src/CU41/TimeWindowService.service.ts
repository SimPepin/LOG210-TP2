import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeWindow } from './TimeWindow.entity';
import { Repository, getConnection } from 'typeorm';
import { Disponibility } from './Disponibility.entity';
import { DAYOFWEEK } from './DAYOFWEEK.entity';

@Injectable()
export class TimeWindowService {
  constructor(
    @InjectRepository(TimeWindow)
    private timeWindowRepository: Repository<TimeWindow>,
  ) {}

  async adjustDisponibilityVisitor(disponibility: Disponibility, id: any) {
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Disponibility)
        .values([
          {
            dayOfWeek: disponibility.dayOfWeek,
            begin: disponibility.begin,
            end: disponibility.end,
            currentState: disponibility.currentState,
            timeWindow: await this.getTimeWindow(id),
          },
        ])
        .execute();

      return 200;
    } catch {
      return 500;
    }
  }

  getTimeWindow(id: number) {
    return getConnection()
      .getRepository(TimeWindow)
      .findOne(id, {
        relations: ['disponibilities'],
        where: [{ timeWindowId: id }],
      });
  }

  async updateDisponibility(disponiblity: Disponibility) {
    try {
      console.log(
        await getConnection()
          .createQueryBuilder()
          .update(Disponibility)
          .set({
            currentState: disponiblity.currentState,
          })
          .where('id = :id', { id: disponiblity.id })
          .execute(),
      );
      return 200;
    } catch {
      return 500;
    }
  }
}
