import { Inject } from '@nestjs/common';
import { Document } from '../entity/document.entity';
import { DocumentPortRepository } from '../ports/document.port.repository';
import { ListDocumentsDto, PaginatedDocumentsDto } from '../../dtos';

export class GetAllDocumentsUseCase {
  constructor(
    @Inject(DocumentPortRepository)
    private readonly documentRepo: DocumentPortRepository,
  ) {}

  async execute(query: ListDocumentsDto): Promise<PaginatedDocumentsDto> {
    const { page = 1, limit = 10 } = query;
    const { documents, total } = await this.documentRepo.findAll(query);

    return {
      data: documents,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }; 
  }
}
