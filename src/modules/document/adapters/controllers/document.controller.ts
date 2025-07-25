import {
  Body,
  Post,
  Get,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Controller,
  Query,
} from '@nestjs/common';
import { CreateDocumentDto } from '../../dtos/createDocument.dto';
import { UpdateDocumentDto } from '../../dtos/updateDocument.dto';
import {
  CreateDocumentUseCase,
  DeleteDocumentUseCase,
  GetAllDocumentsUseCase,
  GetDocumentByIdUseCase,
  GetDocumentsByEmployeeIdUseCase,
  UpdateDocumentUseCase,
} from '../../core/usecases';
import { ListDocumentsDto } from '../../dtos';

@Controller('documents')
export class DocumentController {
  constructor(
    private readonly createDocumentUseCase: CreateDocumentUseCase,
    private readonly getAllDocumentsUseCase: GetAllDocumentsUseCase,
    private readonly findDocumentByIdUseCase: GetDocumentByIdUseCase,
    private readonly getDocumentsByEmployeeIdUseCase: GetDocumentsByEmployeeIdUseCase,
    private readonly updateDocumentUseCase: UpdateDocumentUseCase,
    private readonly deleteDocumentUseCase: DeleteDocumentUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.createDocumentUseCase.execute(createDocumentDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() query: ListDocumentsDto) {
    return this.getAllDocumentsUseCase.execute(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: string) {
    return this.findDocumentByIdUseCase.execute(id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findByEmployeeId(@Param('id') id: string) {
    return this.getDocumentsByEmployeeIdUseCase.execute(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.updateDocumentUseCase.execute(id, updateDocumentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.deleteDocumentUseCase.execute(id);
  }
}
