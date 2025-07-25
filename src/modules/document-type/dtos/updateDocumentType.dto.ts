import { IsOptional, IsString } from 'class-validator';

export class UpdateDocumentTypeDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}