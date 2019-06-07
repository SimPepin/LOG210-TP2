import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from './Template.entity';
import { TemplateService } from './templateService.service';
import { CU37AController } from './CU37A.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Template])],
  providers: [TemplateService],
  controllers: [CU37AController],
})
export class TemplateModule {}
