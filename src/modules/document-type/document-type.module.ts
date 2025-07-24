import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { DocumentTypeController } from './adapters/controllers/document-type.controller';
import { PrismaDocumentTypeRepository } from './adapters/repositories/prismaDocumentType.repository';
import { DocumentTypePortRepository } from './core/ports/document-type.port.repository';
import {
  CreateDocumentTypeUseCase,
  DeleteDocumentTypeUseCase,
  GetAllDocumentTypeUseCase,
  GetDocumentTypeByIdUseCase,
  UpdateDocumentTypeUseCase,
} from './core/usecases';

@Module({
  controllers: [DocumentTypeController],
  providers: [
    PrismaService,
    {
      provide: DocumentTypePortRepository,
      useClass: PrismaDocumentTypeRepository,
    },
    CreateDocumentTypeUseCase,
    DeleteDocumentTypeUseCase,
    GetAllDocumentTypeUseCase,
    GetDocumentTypeByIdUseCase,
    UpdateDocumentTypeUseCase,
  ],
  exports: [DocumentTypePortRepository],
})
export class DocumentTypeModule {}
