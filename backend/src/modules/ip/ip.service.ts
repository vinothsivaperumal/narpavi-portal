import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IpRequest, IpRequestStatus } from './ip-request.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IpService {
  constructor(
    @InjectRepository(IpRequest)
    private ipRequestRepository: Repository<IpRequest>,
    private configService: ConfigService,
  ) {}

  async findAll(): Promise<IpRequest[]> {
    return this.ipRequestRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findByUser(userId: string): Promise<IpRequest[]> {
    return this.ipRequestRepository.find({ where: { userId }, order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<IpRequest> {
    const request = await this.ipRequestRepository.findOne({ where: { id } });
    if (!request) {
      throw new NotFoundException(`IP request #${id} not found`);
    }
    return request;
  }

  async create(userId: string, ipAddress: string, description?: string): Promise<IpRequest> {
    const request = this.ipRequestRepository.create({ userId, ipAddress, description });
    return this.ipRequestRepository.save(request);
  }

  async approve(id: string, reviewedBy: string, reviewNotes?: string): Promise<IpRequest> {
    await this.ipRequestRepository.update(id, {
      status: IpRequestStatus.APPROVED,
      reviewedBy,
      reviewNotes,
    });
    return this.findOne(id);
  }

  async reject(id: string, reviewedBy: string, reviewNotes?: string): Promise<IpRequest> {
    await this.ipRequestRepository.update(id, {
      status: IpRequestStatus.REJECTED,
      reviewedBy,
      reviewNotes,
    });
    return this.findOne(id);
  }
}
