import { Module } from '@nestjs/common';
import { DocumentController } from './adapters/controllers/document.controller';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { DocumentPortRepository } from './core/ports/document.port.repository';
import {
  CreateDocumentUseCase,
  DeleteDocumentUseCase,
  GetAllDocumentsUseCase,
  GetDocumentByIdUseCase,
  GetDocumentsByEmployeeIdUseCase,
  UpdateDocumentUseCase,
} from './core/usecases';
import { DocumentPrismaRepository } from './adapters/repositories/prismaDocument.repository';
import { DocumentTypeModule } from '../document-type/document-type.module';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  imports: [DocumentTypeModule, EmployeeModule],
  providers: [
    PrismaService,
    {
      provide: DocumentPortRepository,
      useClass: DocumentPrismaRepository,
    },
    CreateDocumentUseCase,
    DeleteDocumentUseCase,
    GetAllDocumentsUseCase,
    GetDocumentByIdUseCase,
    GetDocumentsByEmployeeIdUseCase,
    UpdateDocumentUseCase,
  ],
  controllers: [DocumentController],
})
export class DocumentModule {}
