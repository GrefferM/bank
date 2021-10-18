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
import { ObligationService } from './../../src/service/obligation/obligation.service';
import { IDBResponse } from './../../interfaces/db.response.interface';
import { IResponseObligation } from './../../interfaces/obligation.response.interface';
import { IResponseObligations } from './../../interfaces/obligations.response.interface';
import { SetObligationDTO } from './../../shared/dto/set.obligation.dto';
import { GetObligationDTO } from './../../shared/dto/get.obligation.dto';
import { Error } from './../../shared/entity/error.entity';
import { ResponseEntity } from './../../shared/entity/response.entity';
import { GetObligationsEntity } from './../../shared/entity/get.obligations.entity';
import { GetObligationEntity } from './../../shared/entity/get.obligation.entity';

@Controller('api')
export class ObligationController {
  /**
   * Constructor ObligationController
   * @param {ObligationService} @Inject('ObligationService') private obligationService
   */
  constructor(
    @Inject(ObligationService)
    private obligationService: ObligationService
  ) { }
  /**
   * Set obligation
   * @param   {uuid}    user_id
   * @param   {uuid}    employee_id
   * @param   {number}  percent
   * @param   {number}  insurance
   * @param   {number}  current_amount
   * @param   {number}  total_amount
   * @param   {boolean} debt
   * @returns {Promise<IDBResponse>}
   */
  @ApiTags('Obligation')
  @ApiBody({ type: SetObligationDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull save obligation',
    type: ResponseEntity
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Post('obligation')
  @HttpCode(HttpStatus.OK)
  setObligationHandler(@Body() body: SetObligationDTO): Promise<IDBResponse> {
    return this.obligationService.setObligation(
      body.user_id,
      body.employee_id,
      body.percent,
      body.insurance,
      body.current_amount,
      body.total_amount,
      body.debt
    );
  }
  /**
   * Get obligations
   * @returns {Promise<IResponseObligations>}
   */
  @ApiTags('Obligation')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull get obligations',
    type: GetObligationsEntity
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Get('obligation')
  @HttpCode(HttpStatus.OK)
  getObligationsHandler(): Promise<IResponseObligations> {
    return this.obligationService.getObligations();
  }
  /**
  * Get obligation by id
  * @param   {uuid} id
  * @returns {Promise<IResponseObligation>}
  */
  @ApiTags('Obligation')
  @ApiQuery({ type: GetObligationDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull get obligation',
    type: GetObligationEntity
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Get('obligation-single')
  @HttpCode(HttpStatus.OK)
  getObligationByIdHandler(@Query() query: GetObligationDTO): Promise<IResponseObligation> {
    return this.obligationService.getObligationById(query.id);
  }
}
