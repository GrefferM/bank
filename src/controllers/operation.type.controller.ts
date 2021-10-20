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
import { OperationTypeService } from './../../src/service/operation-type/operation-type.service';
import { IDBResponse } from './../../interfaces/db.response.interface';
import { IResponseOperationType } from './../../interfaces/operation.type.response.interface';
import { IResponseOperationTypes } from './../../interfaces/operation.types.response.interface';
import { SetOperationTypeDTO } from './../../shared/dto/set.operation.type.dto';
import { UpdateOperationTypeDTO } from './../../shared/dto/update.operation.type.dto';
import { DeleteOperationTypeDTO } from './../../shared/dto/delete.operation.type.dto';
import { GetOperationTypeDTO } from './../../shared/dto/get.operation.type.dto';
import { Error } from '../../shared/response/error.response';
import { Response } from '../../shared/response/response.response';
import { GetOperationTypesResponse } from '../../shared/response/get.operation.types.response';
import { GetOperationTypeResponse } from '../../shared/response/get.operation.type.response';

@Controller('api')
export class OperationTypeController {
  /**
   * Constructor OperationTypeController
   * @param {OperationTypeService} @Inject('OperationTypeService') private operationTypeService
   */
  constructor(
    @Inject(OperationTypeService)
    private operationTypeService: OperationTypeService
  ) { }
  /**
   * Set operation type
   * @param   {string} title
   * @param   {number} commission
   * @returns {Promise<IDBResponse>}
   */
  @ApiTags('OperationType')
  @ApiBody({ type: SetOperationTypeDTO })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Succesfull save operation type',
    type: Response
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Post('operation-type')
  @HttpCode(HttpStatus.CREATED)
  setOperationTypeHandler(@Body() body: SetOperationTypeDTO): Promise<IDBResponse> {
    return this.operationTypeService.setOperationType(
      body.title,
      body.commission
    );
  }
  /**
   * Update operation type
   * @param   {number} type_id
   * @param   {string} title
   * @param   {number} commission
   * @returns {Promise<IDBResponse>}
   */
  @ApiTags('OperationType')
  @ApiBody({ type: UpdateOperationTypeDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull update operation type',
    type: Response
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Put('operation-type')
  @HttpCode(HttpStatus.OK)
  updateOperationTypeHandler(@Body() body: UpdateOperationTypeDTO): Promise<IDBResponse> {
    return this.operationTypeService.updateOperationType(
      body.type_id,
      body.title,
      body.commission
    );
  }
  /**
   * Delete operation type
   * @param   {number} type_id
   * @returns {Promise<IDBResponse>}
   */
  @ApiTags('OperationType')
  @ApiBody({ type: DeleteOperationTypeDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull delete operation type',
    type: Response
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Delete('operation-type')
  @HttpCode(HttpStatus.OK)
  deleteOperationTypeHandler(@Body() body: DeleteOperationTypeDTO): Promise<IDBResponse> {
    return this.operationTypeService.deleteOperationType(
      body.type_id
    );
  }
  /**
   * Get operation types
   * @returns {Promise<IResponseOperationTypes>}
   */
  @ApiTags('OperationType')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull get operation types',
    type: GetOperationTypesResponse
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Get('operation-type')
  @HttpCode(HttpStatus.OK)
  getOperationTypesHandler(): Promise<IResponseOperationTypes> {
    return this.operationTypeService.getOperationTypes();
  }
  /**
  * Get operation type by id
  * @param   {number} id
  * @returns {Promise<IResponseOperationType>}
  */
  @ApiTags('OperationType')
  @ApiQuery({ type: GetOperationTypeDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull get operation type',
    type: GetOperationTypeResponse
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Get('operation-type-single')
  @HttpCode(HttpStatus.OK)
  getOperationTypeByIdHandler(@Query() query: GetOperationTypeDTO): Promise<IResponseOperationType> {
    return this.operationTypeService.getOperationTypeById(query.id);
  }
}
