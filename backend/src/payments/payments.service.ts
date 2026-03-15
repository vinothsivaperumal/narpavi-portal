import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from './payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
  ) {}

  async create(data: Partial<Payment>): Promise<Payment> {
    const payment = this.paymentsRepository.create(data);
    return this.paymentsRepository.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentsRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findByStudent(studentId: string): Promise<Payment[]> {
    return this.paymentsRepository.find({
      where: { studentId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne({ where: { id } });
    if (!payment) {
      throw new NotFoundException(`Payment with id ${id} not found`);
    }
    return payment;
  }

  async markPaid(id: string, squarePaymentId?: string): Promise<Payment> {
    const payment = await this.findOne(id);
    payment.status = PaymentStatus.PAID;
    payment.paidAt = new Date();
    if (squarePaymentId) {
      payment.squarePaymentId = squarePaymentId;
    }
    return this.paymentsRepository.save(payment);
  }

  async markFailed(id: string): Promise<Payment> {
    const payment = await this.findOne(id);
    payment.status = PaymentStatus.FAILED;
    return this.paymentsRepository.save(payment);
  }

  async update(id: string, attrs: Partial<Payment>): Promise<Payment> {
    const payment = await this.findOne(id);
    Object.assign(payment, attrs);
    return this.paymentsRepository.save(payment);
  }

  async remove(id: string): Promise<void> {
    const payment = await this.findOne(id);
    await this.paymentsRepository.remove(payment);
  }
}
