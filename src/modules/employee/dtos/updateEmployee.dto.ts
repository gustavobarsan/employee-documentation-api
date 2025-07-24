import { EmployeeStatus } from '@prisma/client';
import { IsArray, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  documentTypeIds?: string[];
  
  @IsOptional()
  @IsEnum(EmployeeStatus)
  status?: EmployeeStatus;
}

