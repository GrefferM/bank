import {
  Inject,
  Controller,
  Post,
  Put,
  Delete,
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
import { UpdateAccountTypeDTO } from './../../shared/dto/update.account.type.dto';
import { DeleteAccountTypeDTO } from './../../shared/dto/delete.account.type.dto';
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
    status: HttpStatus.CREATED,
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
  @HttpCode(HttpStatus.CREATED)
  setAccountTypeHandler(@Body() body: SetAccountTypeDTO): Promise<IDBResponse> {
    return this.accountTypeService.setAccountType(
      body.title,
      body.debit
    );
  }
  /**
   * Update account type
   * @param   {number}  type_id
   * @param   {string}  title
   * @param   {boolean} debit
   * @returns {Promise<IDBResponse>}
   */
  @ApiTags('AccountType')
  @ApiBody({ type: UpdateAccountTypeDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull update account type',
    type: Response
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Put('account-type')
  @HttpCode(HttpStatus.OK)
  updateAccountTypeHandler(@Body() body: UpdateAccountTypeDTO): Promise<IDBResponse> {
    return this.accountTypeService.updateAccountType(
      body.type_id,
      body.title,
      body.debit
    );
  }
  /**
   * Delete account type
   * @param   {number}  type_id
   * @returns {Promise<IDBResponse>}
   */
  @ApiTags('AccountType')
  @ApiBody({ type: DeleteAccountTypeDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull delete account type',
    type: Response
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Delete('account-type')
  @HttpCode(HttpStatus.OK)
  deleteAccountTypeHandler(@Body() body: DeleteAccountTypeDTO): Promise<IDBResponse> {
    return this.accountTypeService.deleteAccountType(
      body.type_id
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
