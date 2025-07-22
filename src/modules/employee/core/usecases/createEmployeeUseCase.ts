import { UUID } from 'crypto';
import { Employee } from '../entity/employee.entity';
import { EmployeePortRepository } from '../ports/employee.port.repository';

export class CreateEmployeeUseCase {
  constructor(private readonly employeeRepo: EmployeePortRepository) {}

  async execute(name: string, documentIds: string[] = []): Promise<Employee> {
    const employee = new Employee({
      id: crypto.randomUUID() as UUID,
      name,
      documents: documentIds,
      hiredAt: new Date(),
    });

    return this.employeeRepo.create(employee);
  }
}