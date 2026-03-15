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
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';
import { CreateMessageDto } from './dto/message.dto';

@Controller('messages')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() body: CreateMessageDto, @Request() req) {
    return this.messagesService.create({
      senderId: req.user.userId,
      ...body,
    });
  }

  @Get()
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.messagesService.findAll();
  }

  @Get('inbox')
  getInbox(@Request() req) {
    return this.messagesService.findInbox(req.user.userId);
  }

  @Get('sent')
  getSent(@Request() req) {
    return this.messagesService.findSent(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Patch(':id/read')
  markRead(@Param('id') id: string, @Request() req) {
    return this.messagesService.markRead(id, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.messagesService.remove(id, req.user.userId);
  }
}
