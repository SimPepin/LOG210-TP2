import { Injectable } from '@nestjs/common';
import { Report } from './Report.entity';
import { InjectRepository, getConnectionName } from '@nestjs/typeorm';
import { Repository, getConnection, getRepository } from 'typeorm';
import { Template } from './Template.entity';
import { ObservationNote } from './ObservationNote.entity';
import { Service } from './Service.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private ReportsRepository: Repository<Report>,
  ) {}

  private async findReport(id: number) {
    return await getConnection()
      .getRepository(Report)
      .findOne(id, {
        relations: ['template', 'service', 'observationsNote'],
      });
  }
  async generateReport(report: Report) {
    let idReport = report.id;

    let template = await getConnection()
      .getRepository(Template)
      .findOne(report.template);

    let assoNote = await getConnection()
      .getRepository(ObservationNote)
      .findOne(report.observationsNote);

    let service = await getConnection()
      .getRepository(Service)
      .findOne(report.service);

    await getConnection()
      .getRepository(Report)
      .createQueryBuilder()
      .update()
      .set({
        coordinatorId: report.coordinatorId,
        template: template,
        service: service,
        observationsNote: assoNote,
      })
      .whereInIds(idReport)
      .execute()
      .then();
    return await this.findReport(idReport);
  }
}
