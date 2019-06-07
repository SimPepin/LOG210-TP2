import { Controller, Get, Post, Body } from '@nestjs/common';
import { TemplateService } from './templateService.service';
import { Template } from './Template.entity';

@Controller('CU37A')
export class CU37AController {
  constructor(private templateService: TemplateService) {}

  @Post()
  create(@Body() template: Template) {
    console.log('ça passe ici');
    return this.templateService.createTemplate(template);
  }
  @Get('/Approved')
  displayTemplateList() {
    return this.templateService.getAllApproved();
  }
}
