import { CU41Manager } from './CU41/CU41Manager.controller';
import { VisitorService } from './CU41/VisitorService.service';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('CU41Manager (e2e)', () => {
  let CU41Manager: CU41Manager;
  let visitorService: VisitorService;

  describe('templates', () => {
    let app: INestApplication;
    let server: any;

    beforeAll(async () => {
      const module = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app = module.createNestApplication();
      server = app.getHttpServer();
      await app.init();
    });

    it('Get all visitor', () => {
      return request(server)
        .get('/CU41Manager/visitor')
        .expect([
          {
            id: 1,
            name: 'bob',
            phoneNumber: '514-444-444',
          },
          {
            id: 2,
            name: 'robert',
            phoneNumber: '514-227-270',
          },
        ]);
    });

    it('Get a visitor', () => {
      return request(server)
        .get('/CU41Manager/visitor/1')
        .expect({
          id: 1,
          name: 'bob',
          phoneNumber: '514-444-444',
          timeWindows: [
            {
              id: 1,
              beginningDate: '2019-06-22T14:00:00.000Z',
            },
            {
              id: 2,
              beginningDate: '2019-06-23T14:00:00.000Z',
            },
          ],
        });
    });

    it('add disponibility', () => {
      return request(server)
        .post('/CU41Manager/addDisponibility/2')
        .send({
          dayOfWeek: 'tuesday',
          currentState: 'AVAILABLE',
          begin: '10:00:00',
          end: '11:00:00',
        })
        .expect(201);
    });

    it('creates a new disponiblity and timeWindow', () => {
      return request(server)
        .post('/CU41Manager/createDisponibility/1')
        .send({
          beginningDate: '2019-07-15',
          dayOfWeek: 'tuesday',
          currentState: 'AVAILABLE',
          begin: '10:00:00',
          end: '14:00:00',
        })
        .expect(201);
    });

    afterAll(async () => {
      await app.close();
    });
  });
});
