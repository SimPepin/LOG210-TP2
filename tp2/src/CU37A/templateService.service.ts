import { Injectable } from '@nestjs/common';
import { Template } from './Template.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { TemplateState } from './TemplateState.entity';

@Injectable()
export class TemplateService {
  private state: TemplateState;

  constructor(
    @InjectRepository(Template)
    private templatesRepository: Repository<Template>,
  ) {
    this.state = null;
  }

  private setState(state: TemplateState) {
    this.state = state;
  }

  async createTemplate(template: Template) {
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
            state: TemplateState.INREDACTION,
          },
        ])
        .execute();
      this.state = TemplateState.INREDACTION;

      return 200;
    } catch {
      return 500;
    }
  }

  async getAllApproved() {
    const results = await getConnection()
      .getRepository(Template)
      .find({ where: { state: 'APPROVED' } });
    return results;
  }

  async getAllInApprobation() {
    const results = await getConnection()
      .getRepository(Template)
      .find({ where: { state: 'INAPPROBATION' } });
    return results;
  }

  private async findTemplate(id: number) {
    return await getConnection()
      .getRepository(Template)
      .findOne(id);
  }

  private async updateState(id: number, targetState: TemplateState) {
    await getConnection()
      .getRepository(Template)
      .update(id, { state: targetState });
    return 'the template state have changed to : ' + targetState;
  }

  async setStateToInApprobation(id: number) {
    const tmpTemplateState: Template = await this.findTemplate(id);
    if (tmpTemplateState.state == TemplateState.INREDACTION) {
      this.setState(TemplateState.INAPPROBATION);
      return await this.updateState(id, this.state);
    } else {
      return 'wrong state ! Your state is  : ' + tmpTemplateState.state;
    }
  }

  async setToInCorrection(id: number) {
    const tmpTemplateState: Template = await this.findTemplate(id);

    if (tmpTemplateState.state == TemplateState.INAPPROBATION) {
      this.setState(TemplateState.INCORRECTION);

      return await this.updateState(id, this.state);
    } else {
      return 'wrong state ! Your state is  : ' + tmpTemplateState.state;
    }
  }

  async setToApproved(id: number) {
    const tmpTemplateState: Template = await this.findTemplate(id);

    if (
      tmpTemplateState.state == TemplateState.INAPPROBATION ||
      tmpTemplateState.state == TemplateState.INCORRECTION
    ) {
      this.setState(TemplateState.APPROVED);
      return await this.updateState(id, this.state);
    } else {
      return 'wrong state ! Your state is  : ' + tmpTemplateState.state;
    }
  }

  async setToObsolete(id: number) {
    const tmpTemplateState: Template = await this.findTemplate(id);

    if (tmpTemplateState.state != TemplateState.INREDACTION) {
      this.setState(TemplateState.OBSOLETE);

      return await this.updateState(id, this.state);
    } else {
      return 'wrong state ! Your state is  : ' + tmpTemplateState.state;
    }
  }

  async setToRedaction(id: number) {
    const tmpTemplateState: Template = await this.findTemplate(id);

    if (tmpTemplateState.state == TemplateState.OBSOLETE) {
      this.setState(TemplateState.INREDACTION);

      return await this.updateState(id, this.state);
    } else {
      return 'wrong state ! Your state is  : ' + tmpTemplateState.state;
    }
  }
}
