import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  document: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('BR')
  phone: string;

  @IsNotEmpty()
  @IsDateString()
  admissionDate: Date;

  @IsOptional()
  @IsDateString()
  demissionDate?: Date;

  @IsNotEmpty()
  @IsString()
  status: string;
}
