import { Employee } from '../entity/employee.entity';
import { EmployeePortRepository } from '../ports/employee.port.repository';

export class GetEmployeeByIdUseCase {
  constructor(private readonly employeeRepo: EmployeePortRepository) {}

  async execute(id: string): Promise<Employee | null> {
    return this.employeeRepo.findById(id);
  }
}