import { IsString, IsOptional, IsUUID, IsUrl, IsEnum } from 'class-validator';
import { AgreementStatus } from '../agreement.entity';

export class CreateAgreementDto {
  @IsUUID()
  studentId: string;

  @IsString()
  documentType: string;

  @IsOptional()
  @IsString()
  boldSignDocumentId?: string;

  @IsOptional()
  @IsUrl()
  documentUrl?: string;
}

export class UpdateAgreementDto {
  @IsOptional()
  @IsString()
  documentType?: string;

  @IsOptional()
  @IsString()
  boldSignDocumentId?: string;

  @IsOptional()
  @IsEnum(AgreementStatus)
  status?: AgreementStatus;

  @IsOptional()
  @IsUrl()
  documentUrl?: string;
}
