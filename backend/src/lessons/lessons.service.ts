import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
  ) {}

  async create(data: Partial<Lesson>): Promise<Lesson> {
    const lesson = this.lessonsRepository.create(data);
    return this.lessonsRepository.save(lesson);
  }

  async findAll(): Promise<Lesson[]> {
    return this.lessonsRepository.find({ order: { order: 'ASC' } });
  }

  async findByBatch(batchId: string, publishedOnly = false): Promise<Lesson[]> {
    const where: any = { batchId };
    if (publishedOnly) where.isPublished = true;
    return this.lessonsRepository.find({ where, order: { order: 'ASC' } });
  }

  async findOne(id: string): Promise<Lesson> {
    const lesson = await this.lessonsRepository.findOne({ where: { id } });
    if (!lesson) {
      throw new NotFoundException(`Lesson with id ${id} not found`);
    }
    return lesson;
  }

  async update(id: string, attrs: Partial<Lesson>): Promise<Lesson> {
    const lesson = await this.findOne(id);
    Object.assign(lesson, attrs);
    return this.lessonsRepository.save(lesson);
  }

  async remove(id: string): Promise<void> {
    const lesson = await this.findOne(id);
    await this.lessonsRepository.remove(lesson);
  }
}
