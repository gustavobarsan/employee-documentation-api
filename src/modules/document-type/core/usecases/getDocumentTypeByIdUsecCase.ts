import { Inject } from '@nestjs/common';
import { DocumentType } from '../entity/document-type.entity';
import { DocumentTypePortRepository } from '../ports/document-type.port.repository';

export class GetDocumentTypeByIdUseCase {
  constructor(
    @Inject(DocumentTypePortRepository)
    private readonly documentTypeRepository: DocumentTypePortRepository,
  ) {}

  async execute(id: string): Promise<DocumentType | null> {
    return this.documentTypeRepository.findById(id);
  }
}
