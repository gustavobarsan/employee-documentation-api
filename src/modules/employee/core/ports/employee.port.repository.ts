import { Employee } from '../entity/employee.entity';

export abstract class EmployeePortRepository {
  abstract create(employee: Employee): Promise<Employee>;
  abstract findById(id: string): Promise<Employee | null>;
  abstract findAll(): Promise<Employee[]>;
  abstract update(id: string, employee: Partial<Employee>): Promise<Employee>;
  abstract delete(id: string): Promise<void>;
  abstract linkDocumentTypes(employeeId: string, documentTypeIds: string[]): Promise<Employee>;
  // abstract unlinkDocumentTypes(employeeId: string, documentTypeIds: string[]): Promise<Employee>;
  //   linkDocumentTypes(employeeId: string, documentTypeIds: string[]): Promise<[]>;
  //   unlinkDocumentTypes(employeeId: string, documentTypeIds: string[]): Promise<boolean>; 
  //   getEmployeeDocuments(employeeId: string): Promise<UUID[]>;  
}