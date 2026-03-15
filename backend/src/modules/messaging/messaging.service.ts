import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessagingService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async findConversation(userId1: string, userId2: string): Promise<Message[]> {
    return this.messagesRepository
      .createQueryBuilder('message')
      .where(
        '(message.senderId = :userId1 AND message.recipientId = :userId2) OR (message.senderId = :userId2 AND message.recipientId = :userId1)',
        { userId1, userId2 },
      )
      .orderBy('message.createdAt', 'ASC')
      .getMany();
  }

  async findInbox(userId: string): Promise<Message[]> {
    return this.messagesRepository.find({
      where: { recipientId: userId },
      order: { createdAt: 'DESC' },
    });
  }

  async send(senderId: string, recipientId: string, content: string): Promise<Message> {
    const message = this.messagesRepository.create({ senderId, recipientId, content });
    return this.messagesRepository.save(message);
  }

  async markAsRead(messageId: string): Promise<void> {
    await this.messagesRepository.update(messageId, { isRead: true });
  }
}
