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
import { Error } from '../../shared/response/error.response';
import { Response } from '../../shared/response/response.response';
import { GetAccountTypesResponse } from '../../shared/response/get.account.types.response';
import { GetAccountTypeResponse } from '../../shared/response/get.account.type.response';

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
   * @param   {string}  title
   * @param   {boolean} debit
   * @returns {Promise<IDBResponse>}
   */
  @ApiTags('AccountType')
  @ApiBody({ type: SetAccountTypeDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull save account type',
    type: Response
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
    type: GetAccountTypesResponse
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
    type: GetAccountTypeResponse
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
