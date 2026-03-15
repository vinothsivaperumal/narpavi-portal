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
import { LessonsService } from './lessons.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';
import { CreateLessonDto, UpdateLessonDto } from './dto/lesson.dto';

@Controller('lessons')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() body: CreateLessonDto) {
    return this.lessonsService.create(body);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get('batch/:batchId')
  findByBatch(@Param('batchId') batchId: string, @Request() req) {
    const publishedOnly = req.user.role !== UserRole.ADMIN;
    return this.lessonsService.findByBatch(batchId, publishedOnly);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() body: UpdateLessonDto) {
    return this.lessonsService.update(id, body);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(id);
  }
}
