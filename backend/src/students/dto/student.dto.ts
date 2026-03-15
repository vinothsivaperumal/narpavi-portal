import { IsString, IsOptional, IsDateString, IsEnum, IsUUID } from 'class-validator';
import { StudentStatus } from '../student.entity';

export class CreateStudentDto {
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsUUID()
  batchId?: string;

  @IsOptional()
  @IsDateString()
  enrollmentDate?: Date;

  @IsOptional()
  @IsString()
  phone?: string;
}

export class UpdateStudentDto {
  @IsOptional()
  @IsUUID()
  batchId?: string;

  @IsOptional()
  @IsDateString()
  enrollmentDate?: Date;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEnum(StudentStatus)
  status?: StudentStatus;
}
