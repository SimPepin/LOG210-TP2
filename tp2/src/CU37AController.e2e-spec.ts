import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { CU37AController } from './CU37A/CU37A.controller';
import { TemplateService } from './CU37A/templateService.service';
import { Module, INestApplication } from '@nestjs/common';
import { Service } from './CU37A/Service.entity';
import { Template } from 'src/CU37A/Template.entity';
import { TemplateModule } from './CU37A/TemplateModule.module';
import { AppModule } from './app.module';
import serveStatic = require('serve-static');

describe('CU37AController test', () => {
  let cu37AController: CU37AController;
  let templateService: TemplateService;

  describe('templates', () => {
    let app: INestApplication;
    let server;

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
        .send({
          numberLine: 6,
          numberColumn: 6,
          header: 'Light',
          format: 'centered',
          style: 'time New Roman',
        })
        .expect(201);
    });

    it('should not return created entity ', () => {
      return request(server)
        .post('/CU37ATemplate')
        .send({ test })
        .expect(201);
    });

    it('change state to in approbation', () => {
      return request(server)
        .put('/CU37ATemplate/toInApprobation/32')
        .expect('the template state have changed to : INAPPROBATION');
    });

    it('/Get all in approbation ', () => {
      return request(server)
        .get('/CU37ATemplate/InApprobation')
        .expect([
          {
            id: 6,
            numberLine: 5,
            numberColumn: 5,
            header: 'Light',
            format: 'centered',
            style: 'time New Roman',
            state: 'INAPPROBATION',
          },
          {
            id: 32,
            numberLine: 6,
            numberColumn: 6,
            header: 'Light',
            format: 'centered',
            style: 'time New Roman',
            state: 'INAPPROBATION',
          },
        ]);
    });

    it('change state to correction', () => {
      return request(server)
        .put('/CU37ATemplate/refuseTemplate/34')
        .expect('the template state have changed to : INCORRECTION');
    });

    it('change state to approved', () => {
      return request(server)
        .put('/CU37ATemplate/ApproveTemplate/33')
        .expect('the template state have changed to : APPROVED');
    });

    it('/Get all approved ', () => {
      return request(server)
        .get('/CU37ATemplate/Approved')
        .expect([
          {
            id: 5,
            numberLine: 5,
            numberColumn: 5,
            header: 'Light',
            format: 'centered',
            style: 'time New Roman',
            state: 'APPROVED',
          },
          {
            id: 32,
            numberLine: 6,
            numberColumn: 6,
            header: 'Light',
            format: 'centered',
            style: 'time New Roman',
            state: 'APPROVED',
          },
        ]);
    });

    it('change state to obsolete', () => {
      return request(server)
        .put('/CU37ATemplate/ApproveTemplate/5')
        .expect('the template state have changed to : OBSOLETE');
    });

    it('change state to inRedaction', () => {
      return request(server)
        .put('/CU37ATemplate/ApproveTemplate/35')
        .expect('wrong state ! Your state is  : APPROVED');
    });

    it('should generate report', () => {
      return request(server)
        .put('/CU37AReport/generateReport/')
        .expect(200);
    });

    afterAll(async () => {
      await app.close();
    });
  });
});

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  afterAll(async () => {
    await app.close();
  });
});
