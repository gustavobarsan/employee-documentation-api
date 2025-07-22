import { Employee } from '../entity/employee.entity';
import { EmployeePortRepository } from '../ports/employee.port.repository';

export class UpdateEmployeeUseCase {
  constructor(private readonly employeeRepo: EmployeePortRepository) {}

  async execute(id: string, data: Partial<{ name: string; documentIds: string[] }>): Promise<Employee | null> {
    const existing = await this.employeeRepo.findById(id);
    if (!existing) return null;

    const updated = new Employee({
      ...existing,
      ...data,
      documents: data.documentIds ?? existing.documents,
      updatedAt: new Date(),
    });

    return this.employeeRepo.update(id, updated);
  }
}