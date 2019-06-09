import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CU37AController } from './CU37A/CU37A.controller';
import { TemplateModule } from './CU37A/TemplateModule.module';
import { TemplateService } from './CU37A/templateService.service';
import { INestApplication } from '@nestjs/common';
import { async } from 'rxjs/internal/scheduler/async';
import { request } from 'https';
import { Service } from './CU37A/Service.entity';

/*describe('AppController', () => {
  let appController: AppController;

  let cu37Controller: CU37AController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});*/

/*describe('templates', () => {
  const templateService = { getAllApproved: () => ['approved'] };

  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [TemplateModule],
    })
      .overrideProvider(TemplateService)
      .useValue(templateService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('/GET approved', () => {
    return request(app.getHttpServer())
      .get('/Approved')
      .expect(200)
      .expect({
        data: templateService.getAllApproved(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
*/
