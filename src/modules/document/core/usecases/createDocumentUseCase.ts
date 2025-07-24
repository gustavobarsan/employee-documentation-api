import { Inject } from '@nestjs/common';
import {
  DocumentStatus,
  Document as EmployeeDoc,
} from '../entity/document.entity';
import { DocumentPortRepository } from '../ports/document.port.repository';

export class CreateDocumentUseCase {
  constructor(
    @Inject(DocumentPortRepository)
    private readonly documentRepo: DocumentPortRepository,
  ) {}

  async execute({
    name,
    employeeId,
    documentTypeId,
  }): Promise<EmployeeDoc> {
    const document = new EmployeeDoc({
      id: crypto.randomUUID(),
      name,
      employeeId,
      documentTypeId,
      status: DocumentStatus.PENDING,
    });

    return this.documentRepo.create(document);
  }
}
