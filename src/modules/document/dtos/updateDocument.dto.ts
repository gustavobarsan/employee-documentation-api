import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { DocumentStatus } from '../core/entity/document.entity';

export class UpdateDocumentDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEnum(DocumentStatus)
  status?: DocumentStatus;

  @IsUUID()
  @IsOptional()
  employeeId?: string;

  @IsUUID()
  @IsOptional()
  documentTypeId?: string;
}

