import { Injectable } from '@nestjs/common';
import { Employee } from '../../core/entity/employee.entity';
import { EmployeePortRepository } from '../../core/ports/employee.port.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class PrismaEmployeeRepository implements EmployeePortRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    employeeData: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Employee> {
    return this.prisma.employee.create({
      data: employeeData,
    });
  }

  async findById(id: string): Promise<Employee | null> {
    return this.prisma.employee.findUnique({ where: { id } });
  }

  async findByDocument(document: string): Promise<Employee | null> {
    return this.prisma.employee.findUnique({ where: { document } });
  }

  async findAll(): Promise<Employee[]> {
    return this.prisma.employee.findMany();
  }

  async update(id: string, employeeData: Partial<Employee>): Promise<Employee> {
    return this.prisma.employee.update({ where: { id }, data: employeeData });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.employee.delete({ where: { id } });
  }
}
