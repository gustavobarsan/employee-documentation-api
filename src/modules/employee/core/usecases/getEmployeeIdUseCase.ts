import { Inject } from '@nestjs/common';
import { Employee } from '../entity/employee.entity';
import { EmployeePortRepository } from '../ports/employee.port.repository';

export class GetEmployeeByIdUseCase {
  constructor(
    @Inject(EmployeePortRepository)
    private readonly employeeRepo: EmployeePortRepository
  ) {}

  async execute(id: string): Promise<Employee | null> {
    return this.employeeRepo.findById(id);
  }
}