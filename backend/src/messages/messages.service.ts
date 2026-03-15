import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
  ) {}

  async create(data: { senderId: string; recipientId: string; subject: string; body: string }): Promise<Message> {
    const message = this.messagesRepository.create(data);
    return this.messagesRepository.save(message);
  }

  async findAll(): Promise<Message[]> {
    return this.messagesRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findInbox(userId: string): Promise<Message[]> {
    return this.messagesRepository.find({
      where: { recipientId: userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findSent(userId: string): Promise<Message[]> {
    return this.messagesRepository.find({
      where: { senderId: userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Message> {
    const message = await this.messagesRepository.findOne({ where: { id } });
    if (!message) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }
    return message;
  }

  async markRead(id: string, userId: string): Promise<Message> {
    const message = await this.findOne(id);
    if (message.recipientId !== userId) {
      throw new ForbiddenException('Cannot mark this message as read');
    }
    message.isRead = true;
    return this.messagesRepository.save(message);
  }

  async remove(id: string, userId: string): Promise<void> {
    const message = await this.findOne(id);
    if (message.senderId !== userId && message.recipientId !== userId) {
      throw new ForbiddenException('Cannot delete this message');
    }
    await this.messagesRepository.remove(message);
  }
}
