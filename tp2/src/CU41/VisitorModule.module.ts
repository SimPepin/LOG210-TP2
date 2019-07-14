import { TimeWindow } from './TimeWindow.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CU41Manager } from './CU41Manager.controller';
import { Module } from '@nestjs/common';
import { Visitor } from './Visitor.entity';
import { VisitorService } from './VisitorService.service';
import { TimeWindowModule } from './TimeWindowModule.module';
import { TimeWindowService } from './TimeWindowService.service';

@Module({
  imports: [TypeOrmModule.forFeature([Visitor, TimeWindow])],
  providers: [VisitorService, TimeWindowService],
  controllers: [CU41Manager],
})
export class VisitorModule {}
