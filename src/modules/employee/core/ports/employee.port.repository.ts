import { Employee } from '../entity/employee.entity';
import { CreateEmployeeDto } from '../../dtos';

export interface EmployeePortRepository {
  create(employee: CreateEmployeeDto): Promise<Employee>;
  findById(id: string): Promise<Employee | null>;
  findByDocument(document: string): Promise<Employee | null>;
  findAll(): Promise<Employee[]>;
  update(id: string, employee: Partial<CreateEmployeeDto>): Promise<Employee>;
  delete(id: string): Promise<void>;
}
