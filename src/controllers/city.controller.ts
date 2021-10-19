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
import { IResponseCities } from './../../interfaces/cities.response.interface';
import { SetCityDTO } from './../../shared/dto/set.city.dto';
import { GetCityDTO } from './../../shared/dto/get.city.dto';
import { Error } from '../../shared/response/error.response';
import { Response } from '../../shared/response/response.response';
import { GetCitiesResponse } from '../../shared/response/get.cities.response';
import { GetCityResponse } from '../../shared/response/get.city.response';

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
   * @param   {number} region_id
   * @returns {Promise<IDBResponse>}
   */
  @ApiTags('City')
  @ApiBody({ type: SetCityDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull save city',
    type: Response
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
    return this.cityService.setCity(body.title, body.region_id);
  }
  /**
   * Get cities
   * @returns {Promise<IResponseCities>}
   */
  @ApiTags('City')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull get cities',
    type: GetCitiesResponse
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Get('city')
  @HttpCode(HttpStatus.OK)
  getCitiesHandler(): Promise<IResponseCities> {
    return this.cityService.getCities();
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
    type: GetCityResponse
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Get('city-single')
  @HttpCode(HttpStatus.OK)
  getCityByIdHandler(@Query() query: GetCityDTO): Promise<IResponseCity> {
    return this.cityService.getCityById(query.id);
  }
}
