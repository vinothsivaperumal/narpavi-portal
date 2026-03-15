import { IsString, IsOptional, IsIP } from 'class-validator';

export class CreateIpRequestDto {
  @IsIP()
  ipAddress: string;

  @IsOptional()
  @IsString()
  description?: string;
}
