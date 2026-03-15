import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from './payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
  ) {}

  async findAll(): Promise<Payment[]> {
    return this.paymentsRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findByUser(userId: string): Promise<Payment[]> {
    return this.paymentsRepository.find({ where: { userId }, order: { createdAt: 'DESC' } });
  }

  async createPayment(userId: string, amount: number, description: string, batchId?: string): Promise<Payment> {
    const payment = this.paymentsRepository.create({
      userId,
      amount,
      description,
      batchId,
      status: PaymentStatus.PENDING,
    });
    return this.paymentsRepository.save(payment);
  }

  async updatePaymentStatus(id: string, status: PaymentStatus, squarePaymentId?: string): Promise<Payment> {
    await this.paymentsRepository.update(id, { status, squarePaymentId });
    return this.paymentsRepository.findOne({ where: { id } });
  }
}
