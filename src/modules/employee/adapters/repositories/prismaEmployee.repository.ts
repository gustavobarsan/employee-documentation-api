import { Injectable } from '@nestjs/common';
import {
  Employee as PrismaEmployee,
  Document as PrismaDocument,
} from '@prisma/client'; // Assuming EmployeeStatus is also exported from @prisma/client
import { Employee } from '../../core/entity/employee.entity';
import { EmployeePortRepository } from '../../core/ports/employee.port.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class EmployeePrismaRepository implements EmployeePortRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(employee: Employee): Promise<Employee> {
    const result = await this.prisma.employee.create({
      data: {
        id: employee.id,
        name: employee.name,
        hiredAt: employee.hiredAt,
        status: employee.status as PrismaEmployee['status'],
        createdAt: employee.createdAt,
        updatedAt: employee.updatedAt,
      },
      include: { documents: true },
    });
    return new Employee({
      id: result.id,
      name: result.name,
      hiredAt: result.hiredAt,
      status: result.status as Employee['status'],
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  }

  async findById(id: string): Promise<Employee | null> {
    const result = await this.prisma.employee.findUnique({
      where: { id },
      include: { documents: true },
    });
    return (
      new Employee({
        id: result?.id,
        name: result?.name,
        hiredAt: result?.hiredAt,
        status: result?.status as Employee['status'],
        createdAt: result?.createdAt,
        updatedAt: result?.updatedAt,
      }) || null
    );
  }

  async findAll(): Promise<Employee[]> {
    const results = await this.prisma.employee.findMany({
      include: { documents: true },
    });
    return results.map((result) =>
      new Employee({
        id: result.id,
        name: result.name,
        hiredAt: result.hiredAt,
        status: result.status as Employee['status'],
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      }),
    );
  }

  async update(id: string, employee: Partial<Employee>): Promise<Employee> {
    const result = await this.prisma.employee.update({
      where: { id },
      data: {
        name: employee.name,
        hiredAt: employee.hiredAt,
        status: employee.status as PrismaEmployee['status'],
        createdAt: employee.createdAt,
        updatedAt: employee.updatedAt,
      },
      include: { documents: true },
    });
    return new Employee({
      id: result.id,
      name: result.name,
      hiredAt: result.hiredAt,
      status: result.status as Employee['status'],
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.employee.delete({ where: { id } });
  }
}
