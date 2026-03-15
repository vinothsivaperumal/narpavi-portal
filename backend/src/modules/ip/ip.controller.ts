import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { IpService } from './ip.service';

@ApiTags('ip-management')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ip')
export class IpController {
  constructor(private readonly ipService: IpService) {}

  @Get()
  @ApiOperation({ summary: 'Get all IP requests (admin only)' })
  findAll() {
    return this.ipService.findAll();
  }

  @Get('my-requests')
  @ApiOperation({ summary: 'Get current user IP requests' })
  findMyRequests(@Request() req: any) {
    return this.ipService.findByUser(req.user.userId);
  }

  @Post('request')
  @ApiOperation({ summary: 'Submit an IP whitelist request' })
  create(
    @Request() req: any,
    @Body() body: { ipAddress: string; description?: string },
  ) {
    return this.ipService.create(req.user.userId, body.ipAddress, body.description);
  }

  @Patch(':id/approve')
  @ApiOperation({ summary: 'Approve an IP request (admin only)' })
  approve(
    @Param('id') id: string,
    @Request() req: any,
    @Body() body: { reviewNotes?: string },
  ) {
    return this.ipService.approve(id, req.user.userId, body.reviewNotes);
  }

  @Patch(':id/reject')
  @ApiOperation({ summary: 'Reject an IP request (admin only)' })
  reject(
    @Param('id') id: string,
    @Request() req: any,
    @Body() body: { reviewNotes?: string },
  ) {
    return this.ipService.reject(id, req.user.userId, body.reviewNotes);
  }
}
