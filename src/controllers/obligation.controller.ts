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
import { ObligationService } from './../../src/service/obligation/obligation.service';
import { IDBResponse } from './../../interfaces/db.response.interface';
import { IResponseObligation } from './../../interfaces/obligation.response.interface';
import { IResponseObligations } from './../../interfaces/obligations.response.interface';
import { SetObligationDTO } from './../../shared/dto/set.obligation.dto';
import { UpdateObligationDTO } from './../../shared/dto/update.obligation.dto';
import { DeleteObligationDTO } from './../../shared/dto/delete.obligation.dto';
import { GetObligationDTO } from './../../shared/dto/get.obligation.dto';
import { Error } from '../../shared/response/error.response';
import { Response } from '../../shared/response/response.response';
import { GetObligationsResponse } from '../../shared/response/get.obligations.response';
import { GetObligationResponse } from '../../shared/response/get.obligation.response';

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
    status: HttpStatus.CREATED,
    description: 'Succesfull save obligation',
    type: Response
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Post('obligation')
  @HttpCode(HttpStatus.CREATED)
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
   * Update obligation
   * @param   {uuid}    obligation_id
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
  @ApiBody({ type: UpdateObligationDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull update obligation',
    type: Response
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Put('obligation')
  @HttpCode(HttpStatus.OK)
  updateObligationHandler(@Body() body: UpdateObligationDTO): Promise<IDBResponse> {
    return this.obligationService.updateObligation(
      body.obligation_id,
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
   * Delete obligation
   * @param   {uuid} obligation_id
   * @returns {Promise<IDBResponse>}
   */
  @ApiTags('Obligation')
  @ApiBody({ type: DeleteObligationDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull delete obligation',
    type: Response
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Delete('obligation')
  @HttpCode(HttpStatus.OK)
  deleteObligationHandler(@Body() body: DeleteObligationDTO): Promise<IDBResponse> {
    return this.obligationService.deleteObligation(
      body.obligation_id
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
    type: GetObligationsResponse
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
    type: GetObligationResponse
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
