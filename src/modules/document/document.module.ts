import { Module } from '@nestjs/common';
import { DocumentController } from './adapters/controllers/document.controller';

@Module({
  controllers: [DocumentController]
})
export class DocumentsModule {}
