import { Module } from '@nestjs/common';
import { DocumentsController } from './adapters/controllers/documents.controller';

@Module({
  controllers: [DocumentsController]
})
export class DocumentsModule {}
