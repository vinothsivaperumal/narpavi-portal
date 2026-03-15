import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PaymentsService } from './payments.service';

@ApiTags('payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all payments (admin only)' })
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get('my-payments')
  @ApiOperation({ summary: 'Get current user payments' })
  findMyPayments(@Request() req: any) {
    return this.paymentsService.findByUser(req.user.userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a payment' })
  create(
    @Request() req: any,
    @Body() body: { amount: number; description: string; batchId?: string },
  ) {
    return this.paymentsService.createPayment(
      req.user.userId,
      body.amount,
      body.description,
      body.batchId,
    );
  }
}
