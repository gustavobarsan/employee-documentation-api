import { Employee } from '../entity/employee.entity';

export interface EmployeePortRepository {
  create(employee: Employee): Promise<Employee>;
  findById(id: string): Promise<Employee | null>;
  findByDocument(document: string): Promise<Employee | null>;
  findAll(): Promise<Employee[]>;
  update(id: string, employee: Partial<Employee>): Promise<Employee>;
  delete(id: string): Promise<void>;
//   linkDocumentTypes(employeeId: string, documentTypeIds: string[]): Promise<[]>;
//   unlinkDocumentTypes(employeeId: string, documentTypeIds: string[]): Promise<boolean>; 

//   getEmployeeDocuments(employeeId: string): Promise<UUID[]>;  
}
