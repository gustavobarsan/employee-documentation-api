import { Injectable } from '@nestjs/common';
import { DocumentType } from '../../core/entity/document-type.entity';
import { DocumentTypePortRepository } from '../../core/ports/document-type.port.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaDocumentTypeRepository
  implements DocumentTypePortRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create(documentType: DocumentType): Promise<DocumentType> {
    const createdDocumentType = await this.prisma.documentType.create({
      data: {
        id: documentType.id,
        name: documentType.name,
        description: documentType.description,
      },
    });
    return toDocumentTypeDomain(createdDocumentType);
  }

  async findById(id: string): Promise<DocumentType | null> {
    const documentType = await this.prisma.documentType.findUnique({
      where: { id },
    });
    return documentType ? toDocumentTypeDomain(documentType) : null;
  }

  async findAll(): Promise<DocumentType[]> {
    const documentTypes = await this.prisma.documentType.findMany();
    return documentTypes.map((docType) => toDocumentTypeDomain(docType));
  }

  async findManyByIds(ids: string[]): Promise<DocumentType[]> {
    const documentTypes = await this.prisma.documentType.findMany({
      where: { id: { in: ids } },
    });
    return documentTypes.map((docType) => toDocumentTypeDomain(docType));
  }

  async update(
    id: string,
    documentType: DocumentType,
  ): Promise<DocumentType | null> {
    const updatedDocumentType = await this.prisma.documentType.update({
      where: { id },
      data: {
        name: documentType.name,
        description: documentType.description,
      },
    });
    return updatedDocumentType
      ? toDocumentTypeDomain(updatedDocumentType)
      : null;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.documentType.delete({
      where: { id },
    });
  }
}

function toDocumentTypeDomain(
  data: Prisma.DocumentTypeGetPayload<{}>,
): DocumentType {
  return new DocumentType({
    id: data.id,
    name: data.name,
    description: data.description || undefined,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  });
}
