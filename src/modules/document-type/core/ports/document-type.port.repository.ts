import { DocumentType } from '../entity/document-type.entity';

export abstract class DocumentTypePortRepository {
  abstract create(documentType: DocumentType): Promise<DocumentType>;
  abstract findById(id: string): Promise<DocumentType | null>;
  abstract findAll(): Promise<DocumentType[]>;
  abstract findManyByIds(ids: string[]): Promise<DocumentType[]>;
  abstract update(
    id: string,
    documentType: DocumentType,
  ): Promise<DocumentType | null>;
  abstract delete(id: string): Promise<void>;
}
