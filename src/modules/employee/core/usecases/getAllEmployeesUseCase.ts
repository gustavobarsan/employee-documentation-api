import { Employee } from '../entity/employee.entity';
import { EmployeePortRepository } from '../ports/employee.port.repository';

export class GetAllEmployeesUseCase {
  constructor(private readonly employeeRepo: EmployeePortRepository) {}

  async execute(filters?: { name?: string }): Promise<Employee[]> {
    let employees = await this.employeeRepo.findAll();

    if (filters?.name) {
      const lowerName = filters.name.toLowerCase();
      employees = employees.filter(emp => emp.name.toLowerCase().includes(lowerName));
    }

    return employees;
  }
}