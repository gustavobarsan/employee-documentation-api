import { Document } from '../core/entity/document.entity';

export class PaginatedDocumentsDto {
  data: Document[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
