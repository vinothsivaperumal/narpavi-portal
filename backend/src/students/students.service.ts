import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student, StudentStatus } from './student.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
    private readonly usersService: UsersService,
  ) {}

  async create(data: {
    userId: string;
    batchId?: string;
    enrollmentDate?: Date;
    phone?: string;
  }): Promise<Student> {
    const user = await this.usersService.findOne(data.userId);
    const student = this.studentsRepository.create({
      user,
      batchId: data.batchId,
      enrollmentDate: data.enrollmentDate,
      phone: data.phone,
    });
    return this.studentsRepository.save(student);
  }

  async findAll(): Promise<Student[]> {
    return this.studentsRepository.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<Student> {
    const student = await this.studentsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!student) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    return student;
  }

  async findByUserId(userId: string): Promise<Student> {
    const student = await this.studentsRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (!student) {
      throw new NotFoundException('Student profile not found');
    }
    return student;
  }

  async update(id: string, attrs: Partial<Student>): Promise<Student> {
    const student = await this.findOne(id);
    Object.assign(student, attrs);
    return this.studentsRepository.save(student);
  }

  async remove(id: string): Promise<void> {
    const student = await this.findOne(id);
    await this.studentsRepository.remove(student);
  }
}
