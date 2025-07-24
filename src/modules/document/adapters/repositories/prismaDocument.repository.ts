import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Document, DocumentStatus } from '../../core/entity/document.entity';
import { DocumentPortRepository } from '../../core/ports/document.port.repository';

@Injectable()
export class DocumentPrismaRepository implements DocumentPortRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(document: Document): Promise<Document> {
    const result = await this.prisma.document.create({
      data: {
        id: document.id,
        name: document.name,
        status: document.status as DocumentStatus,
        employeeId: document.employeeId,
        documentTypeId: document.documentTypeId,
      },
    });
    return toDocumentDomain(result);
  }

  async findById(id: string): Promise<Document | null> {
    const data = await this.prisma.document.findUnique({ where: { id } });
    return data ? toDocumentDomain(data) : null;
  }

  async findByEmployeeId(employeeId: string): Promise<Document[]> {
    const results = await this.prisma.document.findMany({
      where: { employeeId },
    });
    return results.map((result) => toDocumentDomain(result));
  }

  async findAll(): Promise<Document[]> {
    const results = await this.prisma.document.findMany();
    return results.map((result) => toDocumentDomain(result));
  }

  async update(id: string, document: Partial<Document>): Promise<Document> {
    const result = await this.prisma.document.update({
      where: { id },
      data: {
        name: document.name,
        status: document.status as DocumentStatus,
        documentTypeId: document.documentTypeId,
      },
    });
    return toDocumentDomain(result);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.document.delete({ where: { id } });
  }
}

function toDocumentDomain(
  data: Prisma.DocumentGetPayload<{}>): Document {
  return new Document({
    id: data.id,
    name: data.name,
    status: data.status as DocumentStatus,
    employeeId: data.employeeId,
    documentTypeId: data.documentTypeId,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  });
}