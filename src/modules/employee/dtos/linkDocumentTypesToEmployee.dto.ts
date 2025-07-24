import { IsArray, IsUUID } from 'class-validator';

export class LinkDocumentTypesToEmployeeDto {
  @IsArray()
  @IsUUID('4', { each: true })
  documentTypeIds: string[];
}
