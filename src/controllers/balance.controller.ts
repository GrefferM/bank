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
import { BalanceService } from './../../src/service/balance/balance.service';
import { IDBResponse } from './../../interfaces/db.response.interface';
import { IResponseBalance } from './../../interfaces/balance.response.interface';
import { IResponseBalances } from './../../interfaces/balances.response.interface';
import { SetBalanceDTO } from './../../shared/dto/set.balance.dto';
import { GetBalanceDTO } from './../../shared/dto/get.balance.dto';
import { Error } from '../../shared/response/error.response';
import { Response } from '../../shared/response/response.response';
import { GetBalancesResponse } from '../../shared/response/get.balances.response';
import { GetBalanceResponse } from '../../shared/response/get.balance.response';

@Controller('api')
export class BalanceController {
  /**
   * Constructor BalanceController
   * @param {BalanceService} @Inject('BalanceService') private balanceService
   */
  constructor(
    @Inject(BalanceService)
    private balanceService: BalanceService
  ) { }
  /**
   * Set balance
   * @param   {number}  amount
   * @param   {boolean} debt
   * @returns {Promise<IDBResponse>}
   */
  @ApiTags('Balance')
  @ApiBody({ type: SetBalanceDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull save balance',
    type: Response
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Post('balance')
  @HttpCode(HttpStatus.OK)
  setBalanceHandler(@Body() body: SetBalanceDTO): Promise<IDBResponse> {
    return this.balanceService.setBalance(body.amount, body.debt);
  }
  /**
   * Get balances
   * @returns {Promise<IResponseBalances>}
   */
  @ApiTags('Balance')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull get balances',
    type: GetBalancesResponse
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Get('balance')
  @HttpCode(HttpStatus.OK)
  getBalancesHandler(): Promise<IResponseBalances> {
    return this.balanceService.getBalances();
  }
  /**
  * Get balance by id
  * @param   {uuid} id
  * @returns {Promise<IResponseBalance>}
  */
  @ApiTags('Balance')
  @ApiQuery({ type: GetBalanceDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull get balance',
    type: GetBalanceResponse
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Get('balance-single')
  @HttpCode(HttpStatus.OK)
  getBalanceByIdHandler(@Query() query: GetBalanceDTO): Promise<IResponseBalance> {
    return this.balanceService.getBalanceById(query.id);
  }
}
