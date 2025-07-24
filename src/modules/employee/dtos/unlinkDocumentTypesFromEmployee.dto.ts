import { IsArray, IsUUID } from 'class-validator';

export class UnlinkDocumentTypesFromEmployeeDto {
  @IsArray()
  @IsUUID('4', { each: true })
  documentTypeIds: string[];
}
