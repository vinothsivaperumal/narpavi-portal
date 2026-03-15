import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(registerDto: RegisterDto): Promise<User> {
    const existing = await this.usersRepository.findOne({
      where: { email: registerDto.email },
    });
    if (existing) {
      throw new ConflictException('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = this.usersRepository.create({
      ...registerDto,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<Partial<User>[]> {
    const users = await this.usersRepository.find();
    return users.map(({ password, ...u }) => u);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async update(id: string, attrs: Partial<User>): Promise<Partial<User>> {
    const user = await this.findOne(id);
    if (attrs.password) {
      attrs.password = await bcrypt.hash(attrs.password, 10);
    }
    Object.assign(user, attrs);
    const saved = await this.usersRepository.save(user);
    const { password, ...safeUser } = saved;
    return safeUser;
  }

  async deactivate(id: string): Promise<Partial<User>> {
    return this.update(id, { isActive: false });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }
}
