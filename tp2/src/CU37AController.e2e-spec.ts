import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { CU37AController } from './CU37A/CU37A.controller';
import { TemplateService } from './CU37A/templateService.service';
import { Module, INestApplication } from '@nestjs/common';
import { Service } from './CU37A/Service.entity';
import { Template } from 'src/CU37A/Template.entity';
import { TemplateModule } from './CU37A/TemplateModule.module';
import { AppModule } from './app.module';

describe('CU37AController test', () => {
  let cu37AController: CU37AController;
  let templateService: TemplateService;

  /*beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CU37AController],
      providers: [TemplateService],
    }).compile();

    templateService = module.get<TemplateService>(TemplateService);
    cu37AController = module.get<CU37AController>(CU37AController);
  });

  describe('post complete', () => {
    it('should return 200 ok', async () => {
      const body = {
        id: 5,
        numberLine: 5,
        numberColumn: 5,
        header: 'Light',
        format: 'centered',
        style: 'time New Roman',
        state: 'en rédaction',
      };
      
      expect(await cu37AController.create(body)).toBe(200);
    });
  });*/

  describe('templates', () => {
    let app: INestApplication;
    let server;
    //let templateServices = {
    // getAllApproved: () => ['APPROVED'],
    //  getAllInApprobation: () => ['INAPPROBATION'],

    beforeAll(async () => {
      const module = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app = module.createNestApplication();
      server = app.getHttpServer();
      await app.init();
    });

    it('should return created entity ', () => {
      return request(server)
        .post('/CU37ATemplate')
        .expect(201, {
          numberLine: 6,
          numberColumn: 6,
          header: 'Light',
          format: 'centered',
          style: 'time New Roman',
        });
    });

    it('/Get all approved ', () => {
      return request(server)
        .get('/CU37ATemplate/Approved')
        .expect(200)
        .expect({
          statusCode: 200,
        });
    });

    afterAll(async () => {
      await app.close();
    });
  });
});
