import {
  Body,
  Controller,
  Delete,
  Get,
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
  UpdateEmployeeUseCase,
} from '../../core/usecases';
import { Employee } from '../../core/entity/employee.entity';
import { CreateEmployeeDto } from '../../dtos';

@Controller('employees')
export class EmployeeController {
  constructor(
    private readonly createUseCase: CreateEmployeeUseCase,
    private readonly getByIdUseCase: GetEmployeeByIdUseCase,
    private readonly getAllUseCase: GetAllEmployeesUseCase,
    private readonly updateUseCase: UpdateEmployeeUseCase,
    private readonly deleteUseCase: DeleteEmployeeUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateEmployeeDto) {
    return this.createUseCase.execute(body.name, body.documents || []);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Employee | null> {
    return this.getByIdUseCase.execute(id);
  }

  @Get()
  async getAll(@Query('name') name?: string) {
    return this.getAllUseCase.execute({ name });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name?: string; documentIds?: string[] },
  ) {
    return this.updateUseCase.execute(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const success = await this.deleteUseCase.execute(id);
    return { success };
  }
}
