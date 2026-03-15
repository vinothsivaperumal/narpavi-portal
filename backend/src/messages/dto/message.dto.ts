import { IsString, IsUUID } from 'class-validator';

export class CreateMessageDto {
  @IsUUID()
  recipientId: string;

  @IsString()
  subject: string;

  @IsString()
  body: string;
}
