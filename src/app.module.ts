import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './modules/employee/employee.module';
import { DocumentTypeModule } from './modules/document-type/document-type.module';
import { DocumentModule } from './modules/document/document.module';
import { PrismaModule } from './shared/prisma/prisma.module';

@Module({
  imports: [EmployeeModule, DocumentTypeModule, DocumentModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
