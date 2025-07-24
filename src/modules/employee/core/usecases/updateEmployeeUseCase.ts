import { Inject } from '@nestjs/common';
import { Employee } from '../entity/employee.entity';
import { EmployeePortRepository } from '../ports/employee.port.repository';

export class UpdateEmployeeUseCase {
  constructor(
    @Inject(EmployeePortRepository)
    private readonly employeeRepo: EmployeePortRepository
  ) {}

  async execute(
    id: string,
    data: { name?: string; documentTypes?: { id: string; name: string; description: string } }
  ): Promise<Employee | null> {
    const existing = await this.employeeRepo.findById(id);
    if (!existing) return null;

    const updatedEmployee = new Employee({
      ...existing,
      name: data.name || existing.name,
      documentTypes: data.documentTypes ? [data.documentTypes] : existing.documentTypes,
      updatedAt: new Date(),
    });

    return this.employeeRepo.update(id, updatedEmployee);
  }
}