import { Inject } from '@nestjs/common';
import { Document } from '../entity/document.entity';
import { DocumentPortRepository } from '../ports/document.port.repository';

export class GetDocumentByIdUseCase {
  constructor(
    @Inject(DocumentPortRepository)
    private readonly documentRepo: DocumentPortRepository,
  ) {}

  async execute(id: string): Promise<Document | null> {
    return this.documentRepo.findById(id);
  }
}
