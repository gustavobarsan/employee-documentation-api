import { UUID } from 'crypto';

export class Employee {
  id: UUID;
  name: string;
  documents: string[];
  hiredAt: Date;
  createdAt: Date;
  updatedAt: Date;
  
  constructor(props: Partial<Employee>) {
    Object.assign(this, props);
    if (!this.createdAt) this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
