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
}

 