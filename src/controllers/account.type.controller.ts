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
import { AccountTypeService } from './../../src/service/account-type/account-type.service';
import { IDBResponse } from './../../interfaces/db.response.interface';
import { IResponseAccountType } from './../../interfaces/account.type.response.interface';
import { IResponseAccountTypes } from './../../interfaces/account.types.response.interface';
import { SetAccountTypeDTO } from './../../shared/dto/set.account.type.dto';
import { GetAccountTypeDTO } from './../../shared/dto/get.account.type.dto';
import { Error } from './../../shared/entity/error.entity';
import { ResponseEntity } from './../../shared/entity/response.entity';
import { GetAccountTypesEntity } from './../../shared/entity/get.account.types.entity';
import { GetAccountTypeEntity } from './../../shared/entity/get.account.type.entity';

@Controller('api')
export class AccountTypeController {
  /**
   * Constructor AccountTypeController
   * @param {AccountTypeService} @Inject('AccountTypeService') private accountTypeService
   */
  constructor(
    @Inject(AccountTypeService)
    private accountTypeService: AccountTypeService
  ) { }
  /**
   * Set account type
   * @param   {number} type
   * @param   {string} user
   * @param   {string} employee
   * @returns {Promise<IDBResponse>}
   */
  @ApiTags('AccountType')
  @ApiBody({ type: SetAccountTypeDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull save account type',
    type: ResponseEntity
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Post('account-type')
  @HttpCode(HttpStatus.OK)
  setAccountTypeHandler(@Body() body: SetAccountTypeDTO): Promise<IDBResponse> {
    return this.accountTypeService.setAccountType(
      body.title,
      body.debit
    );
  }
  /**
   * Get account types
   * @returns {Promise<IResponseAccountTypes>}
   */
  @ApiTags('AccountType')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull get account types',
    type: GetAccountTypesEntity
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Get('account-type')
  @HttpCode(HttpStatus.OK)
  getAccountTypesHandler(): Promise<IResponseAccountTypes> {
    return this.accountTypeService.getAccountTypes();
  }
  /**
   * Get account type by id
   * @param   {number} id
   * @returns {Promise<IResponseAccountType>}
   */
  @ApiTags('AccountType')
  @ApiQuery({ type: GetAccountTypeDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull get account type',
    type: GetAccountTypeEntity
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Get('account-type-single')
  @HttpCode(HttpStatus.OK)
  getAccountTypeByIdHandler(@Query() query: GetAccountTypeDTO): Promise<IResponseAccountType> {
    return this.accountTypeService.getAccountTypeById(query.id);
  }
}
