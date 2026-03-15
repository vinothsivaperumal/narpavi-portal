import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { LessonsService } from './lessons.service';

@ApiTags('lessons')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all lessons' })
  findAll(@Query('batchId') batchId?: string) {
    if (batchId) {
      return this.lessonsService.findByBatch(batchId);
    }
    return this.lessonsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get lesson by ID' })
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new lesson (admin only)' })
  create(@Body() createLessonDto: any) {
    return this.lessonsService.create(createLessonDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update lesson (admin only)' })
  update(@Param('id') id: string, @Body() updateLessonDto: any) {
    return this.lessonsService.update(id, updateLessonDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete lesson (admin only)' })
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(id);
  }
}
