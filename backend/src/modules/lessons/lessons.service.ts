import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonsRepository: Repository<Lesson>,
  ) {}

  async findAll(): Promise<Lesson[]> {
    return this.lessonsRepository.find({ order: { order: 'ASC' } });
  }

  async findByBatch(batchId: string): Promise<Lesson[]> {
    return this.lessonsRepository.find({ where: { batchId, isActive: true }, order: { order: 'ASC' } });
  }

  async findOne(id: string): Promise<Lesson> {
    const lesson = await this.lessonsRepository.findOne({ where: { id } });
    if (!lesson) {
      throw new NotFoundException(`Lesson #${id} not found`);
    }
    return lesson;
  }

  async create(createLessonDto: Partial<Lesson>): Promise<Lesson> {
    const lesson = this.lessonsRepository.create(createLessonDto);
    return this.lessonsRepository.save(lesson);
  }

  async update(id: string, updateLessonDto: Partial<Lesson>): Promise<Lesson> {
    await this.lessonsRepository.update(id, updateLessonDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.lessonsRepository.delete(id);
  }
}
