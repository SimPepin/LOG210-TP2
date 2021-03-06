import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CU37AController } from './CU37A/CU37A.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateModule } from './CU37A/TemplateModule.module';
import { ReportModule } from './CU37A/ReportModule.module';
import { TimeWindowModule } from './CU41/TimeWindowmodule.module';
import { VisitorModule } from './CU41/VisitorModule.module';

@Module({
  imports: [TypeOrmModule.forRoot(), VisitorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
