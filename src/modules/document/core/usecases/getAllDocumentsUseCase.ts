import { Inject } from '@nestjs/common';
import { Document } from '../entity/document.entity';
import { DocumentPortRepository } from '../ports/document.port.repository';

export class GetAllDocumentsUseCase {
  constructor(
    @Inject(DocumentPortRepository)
    private readonly documentRepo: DocumentPortRepository,
  ) {}

  async execute(): Promise<Document[]> {
    return this.documentRepo.findAll();
  }
}
