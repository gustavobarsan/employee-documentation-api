import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Employee } from '../entity/employee.entity';
import { EmployeePortRepository } from '../ports';
import { UnlinkDocumentTypesFromEmployeeDto } from '../../dtos';

@Injectable()
export class UnlinkDocumentTypesFromEmployeeUseCase {
  constructor(
    @Inject(EmployeePortRepository)
    private readonly employeeRepository: EmployeePortRepository,
  ) {}

  async execute(
    employeeId: string,
    { documentTypeIds }: UnlinkDocumentTypesFromEmployeeDto,
  ): Promise<Employee> {
    const employee = await this.employeeRepository.findById(employeeId);
    if (!employee) {
      throw new NotFoundException(`Employee with id ${employeeId} not found`);
    }
    
    return this.employeeRepository.unlinkDocumentTypes(
      employeeId,
      documentTypeIds,
    );
  }
}

