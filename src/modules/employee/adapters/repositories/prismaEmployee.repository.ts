import { Injectable } from '@nestjs/common';
import { Employee } from '../../core/entity/employee.entity';
import { EmployeePortRepository } from '../../core/ports/employee.port.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class EmployeePrismaRepository implements EmployeePortRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(employee: Employee): Promise<Employee> {
    const data = {
      id: employee.id,
      name: employee.name,
      hiredAt: employee.hiredAt,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt,
      documents: {
        connect: employee.documents.map(id => ({ id })),
      },
    };

    const result = await this.prisma.employee.create({ data });
    return new Employee(result);
  }

  async findById(id: string): Promise<Employee | null> {
    const result = await this.prisma.employee.findUnique({
      where: { id },
      include: { documents: true },
    });

    return result ? new Employee(result) : null;
  }

  async findByDocument(documentId: string): Promise<Employee | null> {
    const result = await this.prisma.employee.findFirst({
      where: {
        documents: {
          some: { id: documentId },
        },
      },
    });

    return result ? new Employee(result) : null;
  }

  async findAll(): Promise<Employee[]> {
    const results = await this.prisma.employee.findMany({
      include: { documents: true },
    });

    return results.map(r => new Employee(r));
  }

  async update(id: string, employee: Partial<Employee>): Promise<Employee> {
    const result = await this.prisma.employee.update({
      where: { id },
      data: {
        name: employee.name,
        updatedAt: employee.updatedAt,
        documents: employee.documents ? {
          set: employee.documents.map(id => ({ id })),
        } : undefined,
      },
      include: { documents: true },
    });

    return new Employee(result);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.employee.delete({ where: { id } });
  }
}
