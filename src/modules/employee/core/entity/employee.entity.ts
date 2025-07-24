export class Employee {
  id: string;
  name: string;
  documents?: EmployeeDocument[];
  documentTypes?: { id: string; name: string, description: string}[];
  status: string;
  hiredAt: Date;
  createdAt: Date;
  updatedAt: Date;
  
  constructor(props: Partial<Employee>) {
    Object.assign(this, props);
    if (!this.createdAt) this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export type EmployeeDocument = {
  id: string;
  name: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  employeeId: string;
  documentTypeId: string;
};


export enum EmployeeStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  TERMINATED = 'TERMINATED',
}