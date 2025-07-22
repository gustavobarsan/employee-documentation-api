// modules/employee/core/usecases/delete-employee.usecase.ts
import { EmployeePortRepository } from '../ports/employee.port.repository';

export class DeleteEmployeeUseCase {
  constructor(private readonly employeeRepo: EmployeePortRepository) {}

  async execute(id: string): Promise<boolean> {
    const exists = await this.employeeRepo.findById(id);
    if (!exists) return false;

    await this.employeeRepo.delete(id);
    return true;
  }
}