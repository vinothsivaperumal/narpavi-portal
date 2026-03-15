import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IpRequestsService } from './ip-requests.service';
import { IpRequestsController } from './ip-requests.controller';
import { IpRequest } from './ip-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IpRequest])],
  providers: [IpRequestsService],
  controllers: [IpRequestsController],
  exports: [IpRequestsService],
})
export class IpRequestsModule {}
