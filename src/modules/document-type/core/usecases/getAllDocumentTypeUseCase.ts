import { Inject } from '@nestjs/common';
import { DocumentType } from '../entity/document-type.entity';
import { DocumentTypePortRepository } from '../ports/document-type.port.repository';

export class GetAllDocumentTypeUseCase {
  constructor(
    @Inject(DocumentTypePortRepository)
    private readonly documentTypeRepository: DocumentTypePortRepository,
  ) {}

  async execute(): Promise<DocumentType[]> {
    return this.documentTypeRepository.findAll();
  }
}
