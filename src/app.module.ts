import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './modules/employees/employees.module';
import { DocumentTypesModule } from './modules/document-type/document-types.module';
import { DocumentsModule } from './modules/document/document.module';

@Module({
  imports: [EmployeesModule, DocumentTypesModule, DocumentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
