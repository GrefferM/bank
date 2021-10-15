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
import { RegionService } from './../../src/service/region/region.service';
import { IDBResponse } from './../../interfaces/db.response.interface';
import { IResponseRegion } from './../../interfaces/region.response.interface';
import { SetRegionDTO } from './../../shared/dto/set.region.dto';
import { GetRegionDTO } from './../../shared/dto/get.region.dto';
import { Error } from './../../shared/entity/error.entity';
import { ResponseEntity } from './../../shared/entity/response.entity';
import { GetRegionEntity } from './../../shared/entity/get.region.entity';

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
   * Set city
   * @param   {string} title
   * @param   {number} region
   * @returns {Promise<IDBResponse>}
   */
  @ApiTags('Region')
  @ApiBody({ type: SetRegionDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull save region',
    type: ResponseEntity
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Post('region')
  @HttpCode(HttpStatus.OK)
  setRegionHandler(@Body() body: SetRegionDTO): Promise<IDBResponse> {
    return this.regionService.setRegion(body.title);
  }
  /**
   * Get region by id
   * @param   {number} id
   * @returns {Promise<IResponseRegion>}
   */
  @ApiTags('Region')
  @ApiQuery({ type: GetRegionEntity })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull get region',
    type: GetRegionDTO
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Get('region')
  @HttpCode(HttpStatus.OK)
  getRegionHandler(@Query() query: GetRegionDTO): Promise<IResponseRegion> {
    return this.regionService.getRegion(query.id)
  }
}
