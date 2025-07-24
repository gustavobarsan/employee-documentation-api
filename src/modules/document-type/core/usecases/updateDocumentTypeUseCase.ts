import { Inject } from '@nestjs/common';
import { DocumentType } from '../entity/document-type.entity';
import { DocumentTypePortRepository } from '../ports/document-type.port.repository';

export class UpdateDocumentTypeUseCase {
  constructor(
    @Inject(DocumentTypePortRepository)
    private readonly documentTypeRepository: DocumentTypePortRepository,
  ) {}

  async execute(
    id: string,
    data: Partial<DocumentType>,
  ): Promise<DocumentType | null> {
    const existing = await this.documentTypeRepository.findById(id);
    if (!existing) return null;

    const updatedDocumentType = new DocumentType({
      ...existing,
      ...data,
      updatedAt: new Date(),
    });

    return this.documentTypeRepository.update(id, updatedDocumentType);
  }
}
