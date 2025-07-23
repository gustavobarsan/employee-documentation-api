export class Employee {
  id: string;
  name: string;
  documents: string [];
  documentTypes?: { id: string; name: string, description: string}[];
  status: EmployeeStatus;
  hiredAt: Date;
  createdAt: Date;
  updatedAt: Date;
  
  constructor(props: Partial<Employee>) {
    Object.assign(this, props);
    if (!this.createdAt) this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

enum EmployeeStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  TERMINATED = 'TERMINATED',
}