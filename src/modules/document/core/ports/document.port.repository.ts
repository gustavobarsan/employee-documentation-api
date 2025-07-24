import { Document } from "../entity/document.entity";

export abstract class DocumentPortRepository {
  abstract create(document: Document): Promise<Document>;
  abstract findById(id: string): Promise<Document | null>;
  abstract findByEmployeeId(employeeId: string): Promise<Document[]>;
  abstract findAll(): Promise<Document[]>;
  abstract update(id: string, document: Partial<Document>): Promise<Document>;
  abstract delete(id: string): Promise<void>;
}
