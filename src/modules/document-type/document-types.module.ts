import { Module } from '@nestjs/common';
import { DocumentTypeController } from './adapters/controllers/document-type.controller';

@Module({
  controllers: [DocumentTypeController]
})
export class DocumentTypesModule {}
