import {
  Inject,
  Controller,
  Post,
  Put,
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
import { RegionService } from './../../src/service/region/region.service';
import { IDBResponse } from './../../interfaces/db.response.interface';
import { IResponseRegion } from './../../interfaces/region.response.interface';
import { IResponseRegions } from './../../interfaces/regions.response.interface';
import { SetRegionDTO } from './../../shared/dto/set.region.dto';
import { UpdateRegionDTO } from './../../shared/dto/update.region.dto';
import { GetRegionDTO } from './../../shared/dto/get.region.dto';
import { Error } from './../../shared/response/error.response';
import { Response } from './../../shared/response/response.response';
import { GetRegionsResponse } from './../../shared/response/get.regions.response';
import { GetRegionResponse } from './../../shared/response/get.region.response';

@Controller('api')
export class RegionController {
  /**
   * Constructor RegionController
   * @param {RegionService} @Inject('RegionService') private regionService
   */
  constructor(
    @Inject(RegionService)
    private regionService: RegionService
  ) { }
  /**
   * Set region
   * @param   {string} title
   * @returns {Promise<IDBResponse>}
   */
  @ApiTags('Region')
  @ApiBody({ type: SetRegionDTO })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Succesfull save region',
    type: Response
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Post('region')
  @HttpCode(HttpStatus.CREATED)
  setRegionHandler(@Body() body: SetRegionDTO): Promise<IDBResponse> {
    return this.regionService.setRegion(body.title);
  }
  /**
   * Update region
   * @param   {number} region_id
   * @param   {string} title
   * @returns {Promise<IDBResponse>}
   */
  @ApiTags('Region')
  @ApiBody({ type: UpdateRegionDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull update region',
    type: Response
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Put('region')
  @HttpCode(HttpStatus.OK)
  updateRegionHandler(@Body() body: UpdateRegionDTO): Promise<IDBResponse> {
    return this.regionService.updateRegion(body.region_id, body.title);
  }
  /**
   * Get regions
   * @returns {Promise<IResponseRegions>}
   */
  @ApiTags('Region')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull get regions',
    type: GetRegionsResponse
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Get('region')
  @HttpCode(HttpStatus.OK)
  getRegionsHandler(): Promise<IResponseRegions> {
    return this.regionService.getRegions()
  }
  /**
   * Get region by id
   * @param   {number} id
   * @returns {Promise<IResponseRegion>}
   */
  @ApiTags('Region')
  @ApiQuery({ type: GetRegionDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull get region',
    type: GetRegionResponse
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Get('region-single')
  @HttpCode(HttpStatus.OK)
  getRegionByIdHandler(@Query() query: GetRegionDTO): Promise<IResponseRegion> {
    return this.regionService.getRegionById(query.id)
  }
}
