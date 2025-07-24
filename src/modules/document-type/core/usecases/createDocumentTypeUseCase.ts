import { Inject } from '@nestjs/common';
import { DocumentType } from '../entity/document-type.entity';
import { DocumentTypePortRepository } from '../ports/document-type.port.repository';

export class CreateDocumentTypeUseCase {
  constructor(
    @Inject(DocumentTypePortRepository)
    private readonly documentTypeRepository: DocumentTypePortRepository,
  ) {}

  async execute({ name, description }: { name: string; description?: string }): Promise<DocumentType> {
    const newDocumentType = new DocumentType({
      id: crypto.randomUUID(),
      name,
      description,
    });
    return this.documentTypeRepository.create(newDocumentType);
  }
}
