import { Injectable } from '@nestjs/common';
import {
  EmployeeStatus,
  DocumentStatus,
} from '@prisma/client';
import { Employee } from '../../core/entity/employee.entity';
import { EmployeePortRepository } from '../../core/ports/employee.port.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeePrismaRepository implements EmployeePortRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(employee: Employee): Promise<Employee> {
    const result = await this.prisma.employee.create({
      data: {
        id: employee.id,
        name: employee.name,
        hiredAt: employee.hiredAt,
        status: employee.status as EmployeeStatus,
        documentTypes: {
          connect: employee.documentTypes?.map((dt) => ({ id: dt.id })) || [],
        },
      },
      include: {
        documents: true,
        documentTypes: true,
      },
    });

    return toEmployeeDomain(result);
  }

  async findById(id: string): Promise<Employee | null> {
    const data = await this.prisma.employee.findUnique({
      where: { id },
      include: { documents: true, documentTypes: true },
    });

    return data ? toEmployeeDomain(data) : null;
  }

  async findAll(): Promise<Employee[]> {
    const results = await this.prisma.employee.findMany({
      include: {
        documents: true,
        documentTypes: true,
      },
    });

    return results.map((result) => toEmployeeDomain(result));
  }

  async update(id: string, employee: Partial<Employee>): Promise<Employee> {
    const result = await this.prisma.employee.update({
      where: { id },
      data: {
        name: employee.name,
        hiredAt: employee.hiredAt,
        status: employee.status as EmployeeStatus,
        documentTypes:
          employee.documentTypes !== undefined
            ? {
                set: [],
                connect: employee.documentTypes.map((dt) => ({ id: dt.id })),
              }
            : undefined,
      },
      include: {
        documents: true,
        documentTypes: true,
      },
    });

    return toEmployeeDomain(result);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.employee.delete({ where: { id } });
  }
}

function toEmployeeDomain(data: Prisma.EmployeeGetPayload<{
    include: { documents: true; documentTypes: true };
  }>): Employee {
  return new Employee({
    id: data.id,
    name: data.name,
    hiredAt: data.hiredAt,
    status: data.status as EmployeeStatus,
    documents: data.documents.map((doc: any) => ({
      id: doc.id,
      name: doc.name,
      status: doc.status as DocumentStatus,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      employeeId: doc.employeeId,
      documentTypeId: doc.documentTypeId,
    })),
    documentTypes: data.documentTypes.map((dt: any) => ({
      id: dt.id,
      name: dt.name,
      description: dt.description,
    })),
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  });
}
