import { Injectable } from '@nestjs/common';
import { Template } from './Template.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(Template)
    private templatesRepository: Repository<Template>,
  ) {}

  async createTemplate(template: Template) {
    console.log('ça passe ici');
    //return await this.templatesRepository.create(template);

    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Template)
        .values([
          {
            numberLine: template.numberLine,
            numberColumn: template.numberColumn,
            header: template.header,
            format: template.format,
            style: template.style,
            state: template.state,
          },
        ])
        .execute();
      return 200;
    } catch {
      return 500;
    }
  }

  async getAllApproved() {
    console.log('ici aussi');

    try {
      const results = await getConnection()
        .getRepository(Template)
        .find({ where: { state: 'Approved' } });
      return results;
    } catch {
      return 500;
    }
  }
}
