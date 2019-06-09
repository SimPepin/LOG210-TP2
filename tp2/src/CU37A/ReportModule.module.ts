import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CU37AController } from './CU37A.controller';
import { Report } from './Report.entity';
import { ReportService } from './ReportService.service';
import { TemplateService } from './templateService.service';
import { CU37AReportController } from './CU37AReport.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  providers: [ReportService],
  controllers: [CU37AReportController],
})
export class ReportModule {}
