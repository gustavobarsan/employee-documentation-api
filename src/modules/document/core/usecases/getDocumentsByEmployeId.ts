import { Inject } from '@nestjs/common';
import { Document } from '../entity/document.entity';
import { DocumentPortRepository } from '../ports/document.port.repository';

export class GetDocumentsByEmployeeIdUseCase {
  constructor(
    @Inject(DocumentPortRepository)
    private readonly documentRepo: DocumentPortRepository,
  ) {}

  async execute(employeeId: string): Promise<Document[]> {
    return this.documentRepo.findByEmployeeId(employeeId);
  }
}
