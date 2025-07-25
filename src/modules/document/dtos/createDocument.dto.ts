import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { DocumentStatus } from '../core/entity/document.entity';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(DocumentStatus)
  status: DocumentStatus;

  @IsUUID()
  @IsNotEmpty()
  employeeId: string;

  @IsUUID()
  documentTypeId: string;
}
