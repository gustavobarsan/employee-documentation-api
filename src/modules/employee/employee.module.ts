import { Module } from '@nestjs/common';
import { EmployeeController } from './adapters/controllers/employee.controller';
import { PrismaService } from '../../shared/prisma/prisma.service';
import {
  CreateEmployeeUseCase,
  DeleteEmployeeUseCase,
  GetAllEmployeesUseCase,
  GetEmployeeByIdUseCase,
  UpdateEmployeeUseCase,
} from './core/usecases';
import { EmployeePrismaRepository } from './adapters/repositories/prismaEmployee.repository';
import { EmployeePortRepository } from './core/ports';
import { DocumentTypeModule } from '../document-type/document-type.module';

@Module({
  providers: [
    PrismaService,
    {
      provide: EmployeePortRepository,
      useClass: EmployeePrismaRepository,
    },
    CreateEmployeeUseCase,
    GetEmployeeByIdUseCase,
    GetAllEmployeesUseCase,
    UpdateEmployeeUseCase,
    DeleteEmployeeUseCase,
  ],
  imports: [DocumentTypeModule],
  controllers: [EmployeeController],
  exports: [EmployeePortRepository],
})
export class EmployeeModule {}
