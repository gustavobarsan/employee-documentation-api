import { Inject } from '@nestjs/common';
import { Document } from '../entity/document.entity';
import { DocumentPortRepository } from '../ports/document.port.repository';

export class UpdateDocumentUseCase {
  constructor(
    @Inject(DocumentPortRepository)
    private readonly documentRepo: DocumentPortRepository,
  ) {}

  async execute(
    id: string,
    data: Partial<Document>,
  ): Promise<Document | null> {
    const existing = await this.documentRepo.findById(id);
    if (!existing) return null;

    const updatedDocument = new Document({
      ...existing,
      ...data,
      employeeId: existing.employeeId,
      updatedAt: new Date(),
    });

    return this.documentRepo.update(id, updatedDocument);
  }
}
