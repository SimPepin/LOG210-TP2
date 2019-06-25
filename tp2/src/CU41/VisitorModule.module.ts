import { TimeWindow } from './TimeWindow.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CU41Manager } from './CU41Manager.controller';
import { TimeWindowService } from './TimeWindowService.service';
import { Module } from '@nestjs/common';
import { Visitor } from './Visitor.entity';
import { VisitorService } from './VisitorService.service';

@Module({
  imports: [TypeOrmModule.forFeature([Visitor])],
  providers: [VisitorService],
})
export class VisitorModule {}
