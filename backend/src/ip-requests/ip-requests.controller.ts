import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { IpRequestsService } from './ip-requests.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';
import { CreateIpRequestDto } from './dto/ip-request.dto';

@Controller('ip-requests')
@UseGuards(JwtAuthGuard, RolesGuard)
export class IpRequestsController {
  constructor(private readonly ipRequestsService: IpRequestsService) {}

  @Post()
  create(@Body() body: CreateIpRequestDto, @Request() req) {
    return this.ipRequestsService.create({
      studentId: req.user.userId,
      ...body,
    });
  }

  @Get()
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.ipRequestsService.findAll();
  }

  @Get('my')
  findMine(@Request() req) {
    return this.ipRequestsService.findByStudent(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ipRequestsService.findOne(id);
  }

  @Patch(':id/approve')
  @Roles(UserRole.ADMIN)
  approve(
    @Param('id') id: string,
    @Body() body: { awsSecurityGroupId?: string },
  ) {
    return this.ipRequestsService.approve(id, body.awsSecurityGroupId);
  }

  @Patch(':id/reject')
  @Roles(UserRole.ADMIN)
  reject(@Param('id') id: string) {
    return this.ipRequestsService.reject(id);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.ipRequestsService.remove(id);
  }
}
