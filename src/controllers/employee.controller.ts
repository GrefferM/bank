import {
  Inject,
  Controller,
  Post,
  Get,
  Body,
  Query,
  HttpStatus,
  HttpCode,
  UseFilters
} from '@nestjs/common';
import {
  ApiQuery,
  ApiResponse,
  ApiBody,
  ApiTags
} from '@nestjs/swagger';
import { AllExceptionsFilter } from './../../shared/filter/http-exception.filter';
import { EmployeeService } from './../../src/service/employee/employee.service';
import { IDBResponse } from './../../interfaces/db.response.interface';
import { IResponseEmployee } from './../../interfaces/employee.response.interface';
import { IResponseEmployes } from './../../interfaces/employes.response.interface';
import { SetEmployeeDTO } from './../../shared/dto/set.employee.dto';
import { GetEmployeeDTO } from './../../shared/dto/get.employee.dto';
import { Error } from './../../shared/entity/error.entity';
import { ResponseEntity } from './../../shared/entity/response.entity';
import { GetEmployesEntity } from './../../shared/entity/get.employes.entity';
import { GetEmployeeEntity } from './../../shared/entity/get.employee.entity';

@Controller('api')
export class EmployeeController {
  /**
   * Constructor EmployeeController
   * @param {EmployeeService} @Inject('EmployeeService') private employeeService
   */
  constructor(
    @Inject(EmployeeService)
    private employeeService: EmployeeService
  ) { }
  /**
   * Set employee
   * @param   {string} name
   * @param   {string} phone
   * @param   {string} email
   * @param   {string} address
   * @param   {number} city
   * @returns {Promise<IDBResponse>}
   */
  @ApiTags('Employee')
  @ApiBody({ type: SetEmployeeDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull save employes',
    type: ResponseEntity
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Post('employee')
  @HttpCode(HttpStatus.OK)
  setEmployeeHandler(@Body() body: SetEmployeeDTO): Promise<IDBResponse> {
    return this.employeeService.setEmployee(
      body.name,
      body.phone,
      body.email,
      body.address,
      body.city
    );
  }
  /**
   * Get employes
   * @returns {Promise<IResponseEmployes>}
   */
  @ApiTags('Employee')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull get employes',
    type: GetEmployesEntity
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Get('employee')
  @HttpCode(HttpStatus.OK)
  getEmployesHandler(): Promise<IResponseEmployes> {
    return this.employeeService.getEmployes();
  }
  /**
   * Get employee by id
   * @param   {uuid} id
   * @returns {Promise<IResponseEmployee>}
   */
  @ApiTags('Employee')
  @ApiQuery({ type: GetEmployeeDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull get employee',
    type: GetEmployeeEntity
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Get('employee-single')
  @HttpCode(HttpStatus.OK)
  getEmployeeByIdHandler(@Query() query: GetEmployeeDTO): Promise<IResponseEmployee> {
    return this.employeeService.getEmployeeById(query.id);
  }
}
