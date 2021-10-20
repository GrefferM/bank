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
import { AccountService } from './../../src/service/account/account.service';
import { IDBResponse } from './../../interfaces/db.response.interface';
import { IResponseAccount } from './../../interfaces/account.response.interface';
import { IResponseAccounts } from './../../interfaces/accounts.response.interface';
import { SetAccountDTO } from './../../shared/dto/set.account.dto';
import { UpdateAccountDTO } from './../../shared/dto/update.account.dto';
import { DeleteAccountDTO } from './../../shared/dto/delete.account.dto';
import { GetAccountDTO } from './../../shared/dto/get.account.dto';
import { Error } from '../../shared/response/error.response';
import { Response } from '../../shared/response/response.response';
import { GetAccountsResponse } from '../../shared/response/get.accounts.response';
import { GetAccountResponse } from '../../shared/response/get.account.response';

@Controller('api')
export class AccountController {
  /**
   * Constructor AccountController
   * @param {AccountService} @Inject('AccountService') private accountService
   */
  constructor(
    @Inject(AccountService)
    private accountService: AccountService
  ) { }
  /**
   * Set account
   * @param   {number} type_id
   * @param   {uuid}   user_id
   * @param   {uuid}   employee_id
   * @returns {Promise<IDBResponse>}
   */
  @ApiTags('Account')
  @ApiBody({ type: SetAccountDTO })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Succesfull save account',
    type: Response
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Post('account')
  @HttpCode(HttpStatus.CREATED)
  setAccountHandler(@Body() body: SetAccountDTO): Promise<IDBResponse> {
    return this.accountService.setAccount(
      body.type_id,
      body.user_id,
      body.employee_id
    );
  }
  /**
   * Update account
   * @param   {uuid}   account_id
   * @param   {number} type_id
   * @param   {uuid}   user_id
   * @param   {uuid}   employee_id
   * @returns {Promise<IDBResponse>}
   */
  @ApiTags('Account')
  @ApiBody({ type: UpdateAccountDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull update account',
    type: Response
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Put('account')
  @HttpCode(HttpStatus.OK)
  updateAccountHandler(@Body() body: UpdateAccountDTO): Promise<IDBResponse> {
    return this.accountService.updateAccount(
      body.account_id,
      body.type_id,
      body.user_id,
      body.employee_id
    );
  }
  /**
   * Delete account
   * @param   {uuid}   account_id
   * @returns {Promise<IDBResponse>}
   */
  @ApiTags('Account')
  @ApiBody({ type: DeleteAccountDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull delete account',
    type: Response
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Delete('account')
  @HttpCode(HttpStatus.OK)
  deleteAccountHandler(@Body() body: DeleteAccountDTO): Promise<IDBResponse> {
    return this.accountService.deleteAccount(
      body.account_id
    );
  }
  /**
   * Get accounts
   * @returns {Promise<IResponseAccounts>}
   */
  @ApiTags('Account')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull get accounts',
    type: GetAccountsResponse
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Get('account')
  @HttpCode(HttpStatus.OK)
  getAccountsHandler(): Promise<IResponseAccounts> {
    return this.accountService.getAccounts();
  }
  /**
   * Get account by id
   * @param   {uuid} id
   * @returns {Promise<IResponseAccount>}
   */
  @ApiTags('Account')
  @ApiQuery({ type: GetAccountDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull get account',
    type: GetAccountResponse
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Get('account-single')
  @HttpCode(HttpStatus.OK)
  getAccountByIdHandler(@Query() query: GetAccountDTO): Promise<IResponseAccount> {
    return this.accountService.getAccountById(query.id);
  }
}
