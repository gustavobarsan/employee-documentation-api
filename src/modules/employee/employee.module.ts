import { Module } from '@nestjs/common';
import { EmployeeController } from './adapters/controllers/employee.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeController]
})
export class EmployeeModule {}
