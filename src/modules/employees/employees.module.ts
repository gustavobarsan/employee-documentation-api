import { Module } from '@nestjs/common';
import { EmployeesController } from './adapters/controllers/employees.controller';

@Module({
  controllers: [EmployeesController]
})
export class EmployeesModule {}
