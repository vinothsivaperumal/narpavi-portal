import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Batch } from './batch.entity';

@Injectable()
export class BatchesService {
  constructor(
    @InjectRepository(Batch)
    private readonly batchesRepository: Repository<Batch>,
  ) {}

  async create(data: Partial<Batch>): Promise<Batch> {
    const batch = this.batchesRepository.create(data);
    return this.batchesRepository.save(batch);
  }

  async findAll(): Promise<Batch[]> {
    return this.batchesRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findActive(): Promise<Batch[]> {
    return this.batchesRepository.find({
      where: { isActive: true },
      order: { startDate: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Batch> {
    const batch = await this.batchesRepository.findOne({ where: { id } });
    if (!batch) {
      throw new NotFoundException(`Batch with id ${id} not found`);
    }
    return batch;
  }

  async update(id: string, attrs: Partial<Batch>): Promise<Batch> {
    const batch = await this.findOne(id);
    Object.assign(batch, attrs);
    return this.batchesRepository.save(batch);
  }

  async remove(id: string): Promise<void> {
    const batch = await this.findOne(id);
    await this.batchesRepository.remove(batch);
  }
}
