import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateDocumentTypeUseCase,
  DeleteDocumentTypeUseCase,
  GetAllDocumentTypeUseCase,
  GetDocumentTypeByIdUseCase,
  UpdateDocumentTypeUseCase,
} from '../../core/usecases';
import { CreateDocumentTypeDto } from '../../dtos/createDocumentType.dto';
import { UpdateDocumentTypeDto } from '../../dtos/updateDocumentType.dto';


@Controller('document-types')
export class DocumentTypeController {
  constructor(
    private readonly createDocumentTypeUseCase: CreateDocumentTypeUseCase,
    private readonly deleteDocumentTypeUseCase: DeleteDocumentTypeUseCase,
    private readonly getAllDocumentTypeUseCase: GetAllDocumentTypeUseCase,
    private readonly getDocumentTypeByIdUseCase: GetDocumentTypeByIdUseCase,
    private readonly updateDocumentTypeUseCase: UpdateDocumentTypeUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDto: CreateDocumentTypeDto) {
    return this.createDocumentTypeUseCase.execute(createDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.getAllDocumentTypeUseCase.execute();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string) {
    const documentType = await this.getDocumentTypeByIdUseCase.execute(id);
    if (!documentType) {
      throw new NotFoundException(`DocumentType with id ${id} not found`);
    }
    return documentType;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDocumentTypeDto,
  ) {
    const updated = await this.updateDocumentTypeUseCase.execute(id, updateDto);
    if (!updated) {
      throw new NotFoundException(`DocumentType with id ${id} not found`);
    }
    return updated;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const deleted = await this.deleteDocumentTypeUseCase.execute(id);
    if (!deleted) {
      throw new NotFoundException(`DocumentType with id ${id} not found`);
    }
  }
}

