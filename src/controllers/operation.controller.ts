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
import { OperationService } from './../../src/service/operation/operation.service';
import { IDBResponse } from './../../interfaces/db.response.interface';
import { IResponseOperation } from './../../interfaces/operation.response.interface';
import { IResponseOperations } from './../../interfaces/operations.response.interface';
import { SetOperationDTO } from './../../shared/dto/set.operation.dto';
import { GetOperationDTO } from './../../shared/dto/get.operation.dto';
import { Error } from '../../shared/response/error.response';
import { Response } from '../../shared/response/response.response';
import { GetOperationsResponse } from '../../shared/response/get.operations.response';
import { GetOperationResponse } from '../../shared/response/get.operation.response';

@Controller('api')
export class OperationController {
  /**
   * Constructor OperationController
   * @param {OperationService} @Inject('OperationService') private operationService
   */
  constructor(
    @Inject(OperationService)
    private operationService: OperationService
  ) { }
  /**
   * Set operation
   * @param   {uuid}   payer_id
   * @param   {uuid}   recipient_id
   * @param   {number} type_id
   * @returns {Promise<IDBResponse>}
   */
  @ApiTags('Operation')
  @ApiBody({ type: SetOperationDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull save operation',
    type: Response
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Post('operation')
  @HttpCode(HttpStatus.OK)
  setOperationHandler(@Body() body: SetOperationDTO): Promise<IDBResponse> {
    return this.operationService.setOperation(
      body.payer_id,
      body.recipient_id,
      body.type_id
    );
  }
  /**
   * Get operations
   * @returns {Promise<IResponseOperations>}
   */
  @ApiTags('Operation')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull get operations',
    type: GetOperationsResponse
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Get('operation')
  @HttpCode(HttpStatus.OK)
  getOperationsHandler(): Promise<IResponseOperations> {
    return this.operationService.getOperations();
  }
  /**
  * Get operation by id
  * @param   {uuid} id
  * @returns {Promise<IResponseOperation>}
  */
  @ApiTags('Operation')
  @ApiQuery({ type: GetOperationDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull get operation',
    type: GetOperationResponse
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Get('operation-single')
  @HttpCode(HttpStatus.OK)
  getOperationByIdHandler(@Query() query: GetOperationDTO): Promise<IResponseOperation> {
    return this.operationService.getOperationById(query.id);
  }
}
