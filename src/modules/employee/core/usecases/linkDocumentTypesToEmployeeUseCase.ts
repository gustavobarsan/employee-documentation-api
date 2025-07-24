import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EmployeePortRepository } from '../ports';
import { LinkDocumentTypesToEmployeeDto } from '../../dtos';
import { DocumentTypePortRepository } from 'src/modules/document-type/core/ports/document-type.port.repository';
import { Employee } from '../entity/employee.entity';

@Injectable()
export class LinkDocumentTypesToEmployeeUseCase {
  constructor(
    @Inject(EmployeePortRepository)
    private readonly employeeRepository: EmployeePortRepository,
    @Inject(DocumentTypePortRepository)
    private readonly documentTypeRepository: DocumentTypePortRepository,
  ) {}

  async execute(
    employeeId: string,
    { documentTypeIds }: LinkDocumentTypesToEmployeeDto,
  ): Promise<Employee> {

    const employee = await this.employeeRepository.findById(employeeId);
    if (!employee) {
      throw new NotFoundException(`Employee with id ${employeeId} not found`);
    }

    if (documentTypeIds.length > 0) {
      const existingDocumentTypes = await this.documentTypeRepository.findManyByIds(documentTypeIds);
      if (existingDocumentTypes.length !== documentTypeIds.length) {
        throw new BadRequestException('One or more documentTypeIds are invalid.');
      }
    }

    return this.employeeRepository.linkDocumentTypes(employeeId, documentTypeIds);
  }
}
