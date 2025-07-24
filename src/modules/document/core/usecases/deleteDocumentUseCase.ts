import { Inject } from '@nestjs/common';
import { DocumentPortRepository } from '../ports/document.port.repository';

export class DeleteDocumentUseCase {
  constructor(
    @Inject(DocumentPortRepository)
    private readonly documentRepo: DocumentPortRepository,
  ) {}

  async execute(id: string): Promise<boolean> {
    const exists = await this.documentRepo.findById(id);
    if (!exists) return false;

    await this.documentRepo.delete(id);
    return true;
  }
}
