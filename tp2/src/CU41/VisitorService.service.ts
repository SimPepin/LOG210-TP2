import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Visitor } from './Visitor.entity';
import { TimeWindow } from './TimeWindow.entity';
import { TimeWindowService } from './TimeWindowService.service';
import { Repository, getConnection, getRepository } from 'typeorm';
import { identity } from 'rxjs';

@Injectable()
export class VisitorService {
  constructor(
    @InjectRepository(Visitor)
    private visitorRepository: Repository<Visitor>,
  ) {}

  async getVisitorList() {
    return getRepository(Visitor).find();
  }
  async getvisitor(id: number) {
    return getRepository(Visitor).findOne(id, {
      relations: ['timeWindows'],
      where: [{ visitorId: id }],
    });
  }

  async createNewTimeWindow(timeWindow: TimeWindow, id: number) {
    let timeWindowInfo = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(TimeWindow)
      .values([
        {
          beginningDate: timeWindow.beginningDate,
          visitor: await this.getvisitor(id),
        },
      ])
      .execute();

    
    console.log(timeWindowInfo.generatedMaps[0].id);
    return timeWindowInfo.generatedMaps[0].id;
  }
}
