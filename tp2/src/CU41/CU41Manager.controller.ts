import { Controller, Param, Get, Body, Post, Put } from '@nestjs/common';
import { Visitor } from './Visitor.entity';
import { VisitorService } from './VisitorService.service';
import { TimeWindowService } from './TimeWindowService.service';
import { create } from 'domain';
import { Disponibility } from './Disponibility.entity';
import bodyParser = require('body-parser');
import { TimeWindow } from './TimeWindow.entity';
import { identity } from 'rxjs';

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

  @Put('changeDisponibility')
  async changeDisponibilityVisitor(@Body() disponibility: Disponibility) {
    return this.timeWindowService.updateDisponibility(disponibility);
  }

  @Post('createDisponibility/:id')
  async createDisponibilityVisitor(
    @Body() timeWindow: TimeWindow,
    @Body() disponiblity: Disponibility,

    @Param('id') id,
  ) {
    let timeWindowValue = await this.visitorService.createNewTimeWindow(
      timeWindow,
      id,
    );

    return await this.timeWindowService.adjustDisponibilityVisitor(
      disponiblity,
      timeWindowValue,
    );
  }

  @Get('GetInfo/')
  async getInfo(@Param('id1') id1, @Param('id2') id2) {
    console.log('Un message est envoyé au visiteur : ');
    console.log(await this.visitorService.getVisitorId(id1));
    console.log(await this.timeWindowService.getTimeWindow(id2));

    return 200;
  }
}
