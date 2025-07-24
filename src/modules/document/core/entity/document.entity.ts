export enum DocumentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class Document {
  id: string;
  name: string;
  status: DocumentStatus;
  employeeId: string;
  documentTypeId: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(props: Partial<Document>) {
    Object.assign(this, props);
    if (!this.createdAt) this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
