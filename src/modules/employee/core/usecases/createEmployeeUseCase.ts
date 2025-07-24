import { Inject } from '@nestjs/common';
import { Employee } from '../entity/employee.entity';

import { EmployeePortRepository } from '../ports/employee.port.repository';

export class CreateEmployeeUseCase {
  constructor(
    @Inject(EmployeePortRepository)
    private readonly employeeRepo: EmployeePortRepository
  ) {}

  async execute(
    name: string,
  ): Promise<Employee> {
    const employee = new Employee({
      id: crypto.randomUUID(),
      name,
      hiredAt: new Date(),
      status: 'ACTIVE',
      documentTypes: [],
      documents: [],
    });

    return this.employeeRepo.create(employee);
  }
}