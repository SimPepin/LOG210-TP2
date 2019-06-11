import { Controller, Put, Param, Body, Get } from '@nestjs/common';
import { ReportService } from './ReportService.service';
import bodyParser = require('body-parser');
import { Report } from './Report.entity';

@Controller('CU37AReport')
export class CU37AReportController {
  constructor(private reportService: ReportService) {}

  @Put('/generateReport')
  generateReport(@Body() report: Report) {
    console.log('ca passe dans gen repport');
    return this.reportService.generateReport(report);
  }
}
