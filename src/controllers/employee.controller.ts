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
import { Error } from '../../shared/response/error.response';
import { Response } from '../../shared/response/response.response';
import { GetEmployesResponse } from '../../shared/response/get.employes.response';
import { GetEmployeeResponse } from '../../shared/response/get.employee.response';

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
   * @param   {number} city_id
   * @returns {Promise<IDBResponse>}
   */
  @ApiTags('Employee')
  @ApiBody({ type: SetEmployeeDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull save employes',
    type: Response
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
      body.city_id
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
    type: GetEmployesResponse
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
    type: GetEmployeeResponse
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
