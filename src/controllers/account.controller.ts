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
import { AccountService } from './../../src/service/account/account.service';
import { IDBResponse } from './../../interfaces/db.response.interface';
import { IResponseAccount } from './../../interfaces/account.response.interface';
import { IResponseAccounts } from './../../interfaces/accounts.response.interface';
import { SetAccountDTO } from './../../shared/dto/set.account.dto';
import { GetAccountDTO } from './../../shared/dto/get.account.dto';
import { Error } from './../../shared/entity/error.entity';
import { ResponseEntity } from './../../shared/entity/response.entity';
import { GetAccountsEntity } from './../../shared/entity/get.accounts.entity';
import { GetAccountEntity } from './../../shared/entity/get.account.entity';

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
    status: HttpStatus.OK,
    description: 'Succesfull save account',
    type: ResponseEntity
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Post('account')
  @HttpCode(HttpStatus.OK)
  setAccountHandler(@Body() body: SetAccountDTO): Promise<IDBResponse> {
    return this.accountService.setAccount(
      body.type_id,
      body.user_id,
      body.employee_id
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
    type: GetAccountsEntity
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
    type: GetAccountEntity
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
