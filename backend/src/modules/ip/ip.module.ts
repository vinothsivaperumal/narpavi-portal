import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IpService } from './ip.service';
import { IpController } from './ip.controller';
import { IpRequest } from './ip-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IpRequest])],
  providers: [IpService],
  controllers: [IpController],
  exports: [IpService],
})
export class IpModule {}
