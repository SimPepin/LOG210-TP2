import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createConnection, getConnection } from 'typeorm';
import { Template } from './CU37A/Template.entity';
import { Report } from './CU37A/Report.entity';
import { Service } from './CU37A/Service.entity';
import { ObservationNote } from './CU37A/ObservationNote.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
