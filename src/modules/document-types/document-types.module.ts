import { Module } from '@nestjs/common';
import { DocumentTypesController } from './adapters/controllers/document-types.controller';

@Module({
  controllers: [DocumentTypesController]
})
export class DocumentTypesModule {}
