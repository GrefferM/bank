import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { City } from './../../entity/City';
import { Region } from './../../entity/Region';
import { IDBResponse } from './../../../interfaces/db.response.interface';
import { IResponseCity } from './../../../interfaces/city.response.interface';
import { IResponseCities } from './../../../interfaces/cities.response.interface';
import { CITY_REPOSITORY, REGION_REPOSITORY } from './../../constants';

@Injectable()
export class CityService {
  /**
   * Constructor CityService
   * @param {CITY_REPOSITORY}   @Inject('CITY_REPOSITORY')   private cityRepository
   * @param {REGION_REPOSITORY} @Inject('REGION_REPOSITORY') private regionRepository
   */
  constructor(
    @Inject(CITY_REPOSITORY)
    private cityRepository: Repository<City>,
    @Inject(REGION_REPOSITORY)
    private regionRepository: Repository<Region>
  ) { }
  /**
   * Set city
   * @param   {string} title
   * @param   {number} region
   * @returns {Promise<IDBResponse>}
   */
  public async setCity(title: string, region_id: number): Promise<IDBResponse> {
    try {
      const region = await this.regionRepository.findOne({ id: region_id })
      const city = this.cityRepository.create({
        title,
        region
      })

      return this.cityRepository
        .save(city)
        .then(() => {
          return {
            success: true,
            message: 'success'
          }
        })
    } catch (err) {
      return {
        success: false,
        message: err.message
      }
    }
  }
  /**
   * Get cities
   * @returns {Promise<IResponseCities>}
   */
  public async getCities(): Promise<IResponseCities> {
    try {
      const city = await this.cityRepository.find();

      return {
        success: true,
        message: 'success',
        data: city ? city : null
      }
    } catch (err) {
      return {
        success: false,
        message: err.message,
        data: null
      }
    }
  }
  /**
   * Get city
   * @param   {number} id
   * @returns {Promise<IResponseCity>}
   */
  public async getCityById(id: number): Promise<IResponseCity> {
    try {
      const city = await this.cityRepository.findOne({ id: id });

      return {
        success: true,
        message: 'success',
        data: city ? city : null
      }
    } catch (err) {
      return {
        success: false,
        message: err.message,
        data: null
      }
    }
  }
}
