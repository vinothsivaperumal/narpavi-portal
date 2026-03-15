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
import { MessagingService } from './messaging.service';

@ApiTags('messaging')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Get('inbox')
  @ApiOperation({ summary: 'Get inbox messages' })
  getInbox(@Request() req: any) {
    return this.messagingService.findInbox(req.user.userId);
  }

  @Get('conversation/:userId')
  @ApiOperation({ summary: 'Get conversation with a user' })
  getConversation(@Request() req: any, @Param('userId') userId: string) {
    return this.messagingService.findConversation(req.user.userId, userId);
  }

  @Post('send')
  @ApiOperation({ summary: 'Send a message' })
  send(
    @Request() req: any,
    @Body() body: { recipientId: string; content: string },
  ) {
    return this.messagingService.send(req.user.userId, body.recipientId, body.content);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark a message as read' })
  markAsRead(@Param('id') id: string) {
    return this.messagingService.markAsRead(id);
  }
}
