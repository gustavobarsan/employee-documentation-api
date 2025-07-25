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
  Query,
} from '@nestjs/common';
import {
  CreateEmployeeUseCase,
  DeleteEmployeeUseCase,
  GetAllEmployeesUseCase,
  GetEmployeeByIdUseCase,
  LinkDocumentTypesToEmployeeUseCase,
  UpdateEmployeeUseCase,
  UnlinkDocumentTypesFromEmployeeUseCase,
} from '../../core/usecases';
import {
  CreateEmployeeDto,
  LinkDocumentTypesToEmployeeDto,
  UnlinkDocumentTypesFromEmployeeDto,
  UpdateEmployeeDto,
} from '../../dtos';

@Controller('employees')
export class EmployeeController {
  constructor(
    private readonly createEmployeeUseCase: CreateEmployeeUseCase,
    private readonly getEmployeeByIdUseCase: GetEmployeeByIdUseCase,
    private readonly getAllEmployeesUseCase: GetAllEmployeesUseCase,
    private readonly updateEmployeeUseCase: UpdateEmployeeUseCase,
    private readonly deleteEmployeeUseCase: DeleteEmployeeUseCase,
    private readonly linkDocumentTypesToEmployeeUseCase: LinkDocumentTypesToEmployeeUseCase,
    private readonly unlinkDocumentTypesFromEmployeeUseCase: UnlinkDocumentTypesFromEmployeeUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDto: CreateEmployeeDto) {
    return this.createEmployeeUseCase.execute(createDto.name);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string) {
    const employee = await this.getEmployeeByIdUseCase.execute(id);
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return employee;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query('name') name?: string) {
    return this.getAllEmployeesUseCase.execute({ name });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateDto: UpdateEmployeeDto) {
    const updated = await this.updateEmployeeUseCase.execute(id, updateDto);
    if (!updated) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return updated;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const deleted = await this.deleteEmployeeUseCase.execute(id);
    if (!deleted) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
  }

  @Post(':id/document-types')
  @HttpCode(HttpStatus.OK)
  linkDocumentTypes(
    @Param('id') id: string,
    @Body() linkDto: LinkDocumentTypesToEmployeeDto,
  ) {
    return this.linkDocumentTypesToEmployeeUseCase.execute(id, linkDto);
  }

  @Delete(':id/document-types')
  @HttpCode(HttpStatus.OK)
  unlinkDocumentTypes(
    @Param('id') id: string,
    @Body() unlinkDto: UnlinkDocumentTypesFromEmployeeDto,
  ) {
    return this.unlinkDocumentTypesFromEmployeeUseCase.execute(id, unlinkDto);
  }
}
