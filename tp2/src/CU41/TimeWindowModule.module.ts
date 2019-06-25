import { TimeWindow } from './TimeWindow.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CU41Manager } from './CU41Manager.controller';
import { TimeWindowService } from './TimeWindowService.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([TimeWindow])],
  providers: [TimeWindowService],
  controllers: [CU41Manager],
})
export class TimeWindowModule {}
