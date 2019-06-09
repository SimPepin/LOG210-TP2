import { Injectable } from '@nestjs/common';
import { Report } from './Report.entity';
import { InjectRepository, getConnectionName } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
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
      .findOne(id);
  }
  async generateReport(
    idReport: number,
    idTemplate: number,
    idService: number,
    idObsNote: number,
  ) {
    const tmpTemplate = await getConnection()
      .getRepository(Template)
      .findOne(idTemplate);
    const tmpService = await getConnection()
      .getRepository(Service)
      .findOne(idService);
    const tmpObsNote = await getConnection()
      .getRepository(ObservationNote)
      .findOne(idObsNote);
    await getConnection()
      .getRepository(Report)
      .update(idReport, { template: tmpTemplate });
    await getConnection()
      .getRepository(Report)
      .update(idReport, { service: tmpService });
    await getConnection()
      .getRepository(Report)
      .update(idReport, { observationsNote: tmpObsNote });

    return await this.findReport(idReport);
  }
}
