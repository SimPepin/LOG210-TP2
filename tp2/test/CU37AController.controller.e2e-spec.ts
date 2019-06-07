import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { CU37AController } from '../src/CU37A/CU37A.controller';
import { TemplateService } from '../src/CU37A/templateService.service';
import { Module } from '@nestjs/common';
import { Service } from '../src/CU37A/Service.entity';
import { Template } from 'src/CU37A/Template.entity';

describe('CU37AController test', () => {
  let cu37AController: CU37AController;
  let templateService: TemplateService;

  beforeEach(async () => {
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
      //jest.spyOn(templateService, 'createTemplate').mockImplementation((body) => 200);
      expect(await cu37AController.create(body)).toBe(200);
    });
  });
});
