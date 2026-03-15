import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { BatchesService } from './batches.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';
import { CreateBatchDto, UpdateBatchDto } from './dto/batch.dto';

@Controller('batches')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BatchesController {
  constructor(private readonly batchesService: BatchesService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() body: CreateBatchDto) {
    return this.batchesService.create(body);
  }

  @Get()
  findAll() {
    return this.batchesService.findAll();
  }

  @Get('active')
  findActive() {
    return this.batchesService.findActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.batchesService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() body: UpdateBatchDto) {
    return this.batchesService.update(id, body);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.batchesService.remove(id);
  }
}
