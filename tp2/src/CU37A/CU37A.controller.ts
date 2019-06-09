import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { TemplateService } from './templateService.service';
import { Template } from './Template.entity';
import { puts } from 'util';
import { identity } from 'rxjs';
import { Report } from './Report.entity';
import { ReportService } from './ReportService.service';

@Controller('CU37ATemplate')
export class CU37AController {
  constructor(private templateService: TemplateService) {}

  @Post()
  create(@Body() template: Template) {
    console.log('ça passe ici');
    return this.templateService.createTemplate(template);
  }
  @Get('/Approved')
  displayApprovedTemplateList() {
    return this.templateService.getAllApproved();
  }

  @Get('/InApprobation')
  displayInApprobationTemplateList() {
    return this.templateService.getAllInApprobation();
  }
  @Put('/toInApprobation/:id')
  setToInApprobation(@Param('id') id) {
    return this.templateService.setStateToInApprobation(id);
  }
  @Put('/refuseTemplate/:id')
  setToInCorrection(@Param('id') id) {
    return this.templateService.setToInCorrection(id);
  }

  @Put('/ApproveTemplate/:id')
  setToApproved(@Param('id') id) {
    return this.templateService.setToApproved(id);
  }

  @Put('/setToObsolete/:id')
  setToObsolete(@Param('id') id) {
    return this.templateService.setToObsolete(id);
  }

  @Put('/setToInRedaction/:id')
  setToRedaction(@Param('id') id) {
    return this.templateService.setToRedaction(id);
  }
}
