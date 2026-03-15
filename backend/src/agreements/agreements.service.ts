import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agreement, AgreementStatus } from './agreement.entity';

@Injectable()
export class AgreementsService {
  constructor(
    @InjectRepository(Agreement)
    private readonly agreementsRepository: Repository<Agreement>,
  ) {}

  async create(data: Partial<Agreement>): Promise<Agreement> {
    const agreement = this.agreementsRepository.create(data);
    return this.agreementsRepository.save(agreement);
  }

  async findAll(): Promise<Agreement[]> {
    return this.agreementsRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findByStudent(studentId: string): Promise<Agreement[]> {
    return this.agreementsRepository.find({
      where: { studentId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Agreement> {
    const agreement = await this.agreementsRepository.findOne({ where: { id } });
    if (!agreement) {
      throw new NotFoundException(`Agreement with id ${id} not found`);
    }
    return agreement;
  }

  async markSigned(id: string, boldSignDocumentId?: string, documentUrl?: string): Promise<Agreement> {
    const agreement = await this.findOne(id);
    agreement.status = AgreementStatus.SIGNED;
    agreement.signedAt = new Date();
    if (boldSignDocumentId) agreement.boldSignDocumentId = boldSignDocumentId;
    if (documentUrl) agreement.documentUrl = documentUrl;
    return this.agreementsRepository.save(agreement);
  }

  async markDeclined(id: string): Promise<Agreement> {
    const agreement = await this.findOne(id);
    agreement.status = AgreementStatus.DECLINED;
    return this.agreementsRepository.save(agreement);
  }

  async update(id: string, attrs: Partial<Agreement>): Promise<Agreement> {
    const agreement = await this.findOne(id);
    Object.assign(agreement, attrs);
    return this.agreementsRepository.save(agreement);
  }

  async remove(id: string): Promise<void> {
    const agreement = await this.findOne(id);
    await this.agreementsRepository.remove(agreement);
  }
}
