import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IpRequest, IpRequestStatus } from './ip-request.entity';

@Injectable()
export class IpRequestsService {
  constructor(
    @InjectRepository(IpRequest)
    private readonly ipRequestsRepository: Repository<IpRequest>,
  ) {}

  async create(data: { studentId: string; ipAddress: string; description?: string }): Promise<IpRequest> {
    const ipRequest = this.ipRequestsRepository.create(data);
    return this.ipRequestsRepository.save(ipRequest);
  }

  async findAll(): Promise<IpRequest[]> {
    return this.ipRequestsRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findByStudent(studentId: string): Promise<IpRequest[]> {
    return this.ipRequestsRepository.find({
      where: { studentId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<IpRequest> {
    const ipRequest = await this.ipRequestsRepository.findOne({ where: { id } });
    if (!ipRequest) {
      throw new NotFoundException(`IP request with id ${id} not found`);
    }
    return ipRequest;
  }

  async approve(id: string, awsSecurityGroupId?: string): Promise<IpRequest> {
    const ipRequest = await this.findOne(id);
    ipRequest.status = IpRequestStatus.APPROVED;
    if (awsSecurityGroupId) {
      ipRequest.awsSecurityGroupId = awsSecurityGroupId;
    }
    return this.ipRequestsRepository.save(ipRequest);
  }

  async reject(id: string): Promise<IpRequest> {
    const ipRequest = await this.findOne(id);
    ipRequest.status = IpRequestStatus.REJECTED;
    return this.ipRequestsRepository.save(ipRequest);
  }

  async remove(id: string): Promise<void> {
    const ipRequest = await this.findOne(id);
    await this.ipRequestsRepository.remove(ipRequest);
  }
}
