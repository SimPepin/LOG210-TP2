import { Controller, Put, Param, Body, Get } from '@nestjs/common';
import { ReportService } from './ReportService.service';

@Controller('CU37AReport')
export class CU37AReportController {
  constructor(private reportService: ReportService) {}

  @Get('/generateReport')
  generateReport(
    @Param('id1') id1,
    @Param('id2') id2,
    @Param('id3') id3,
    @Param('id4') id4,
  ) {
    console.log(id1);
    return this.reportService.generateReport(id1, id2, id3, id4);
  }
}
