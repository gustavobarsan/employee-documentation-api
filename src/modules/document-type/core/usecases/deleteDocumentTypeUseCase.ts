import { Inject } from '@nestjs/common';
import { DocumentTypePortRepository } from '../ports/document-type.port.repository';

export class DeleteDocumentTypeUseCase {
  constructor(
    @Inject(DocumentTypePortRepository)
    private readonly documentTypeRepository: DocumentTypePortRepository,
  ) {}

  async execute(id: string): Promise<boolean> {
    const exists = await this.documentTypeRepository.findById(id);
    if (!exists) return false;

    await this.documentTypeRepository.delete(id);
    return true;
  }
}
