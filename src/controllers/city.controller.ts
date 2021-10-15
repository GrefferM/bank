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
import { CityService } from './../../src/service/city/city.service';
import { IDBResponse } from './../../interfaces/db.response.interface';
import { IResponseCity } from './../../interfaces/city.response.interface';
import { SetCityDTO } from './../../shared/dto/set.city.dto';
import { GetCityDTO } from './../../shared/dto/get.city.dto';
import { Error } from './../../shared/entity/error.entity';
import { ResponseEntity } from './../../shared/entity/response.entity';
import { GetCityEntity } from './../../shared/entity/get.city.entity';

@Controller('api')
export class CityController {
  /**
   * Constructor CityController
   * @param {CityService} @Inject('CityService') private cityService
   */
  constructor(
    @Inject(CityService)
    private cityService: CityService
  ) { }
  /**
   * Set city
   * @param   {string} title
   * @param   {number} region
   * @returns {Promise<IDBResponse>}
   */
  @ApiTags('City')
  @ApiBody({ type: SetCityDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull save city',
    type: ResponseEntity
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Post('city')
  @HttpCode(HttpStatus.OK)
  setCityHandler(@Body() body: SetCityDTO): Promise<IDBResponse> {
    return this.cityService.setCity(body.title, body.region);
  }
  /**
   * Get city by id
   * @param   {number} id
   * @returns {Promise<IResponseCity>}
   */
  @ApiTags('City')
  @ApiQuery({ type: GetCityDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull get city',
    type: GetCityEntity
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Get('city')
  @HttpCode(HttpStatus.OK)
  getCityHandler(@Query() query: GetCityDTO): Promise<IResponseCity> {
    return this.cityService.getCity(query.id)
  }
}
