import { Controller, Param, Get, Body, Post } from '@nestjs/common';
import { Visitor } from './Visitor.entity';
import { VisitorService } from './VisitorService.service';
import { TimeWindowService } from './TimeWindowService.service';
import { create } from 'domain';
import { Disponibility } from './Disponibility.entity';
import bodyParser = require('body-parser');
import { TimeWindow } from './TimeWindow.entity';

@Controller('CU41Manager')
export class CU41Manager {
  constructor(
    private visitorService: VisitorService,
    private timeWindowService: TimeWindowService,
  ) {}

  @Get('visitor/:id')
  getVisitorInfo(@Param('id') id) {
    return this.visitorService.getvisitor(id);
  }

  @Get('visitor/')
  displayVisitorList() {
    return this.visitorService.getVisitorList();
  }

  @Post('addDisponibility/:id')
  adjustDisponibilityVisitor(
    @Body() disponibility: Disponibility,
    @Param('id') id,
  ) {
    return this.timeWindowService.adjustDisponibilityVisitor(disponibility, id);
  }

  @Post('createDisponibility/:id')
  async createDisponibilityVisitor(
    @Body() timeWindow: TimeWindow,
    @Body() disponiblity: Disponibility,

    @Param('id') id,
  ) {
    console.log(timeWindow);
    console.log(disponiblity);
    let timeWindowValue = await this.visitorService.createNewTimeWindow(
      timeWindow,
      id,
    );

    return await this.timeWindowService.adjustDisponibilityVisitor(
      disponiblity,
      timeWindowValue,
    );
  }
}
