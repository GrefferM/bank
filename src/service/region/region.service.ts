import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Region } from './../../entity/Region';
import { IDBResponse } from './../../../interfaces/db.response.interface';
import { IResponseRegion } from './../../../interfaces/region.response.interface';
import { REGION_REPOSITORY } from './../../constants';

@Injectable()
export class RegionService {
  /**
   * Constructor RegionService
   * @param {REGION_REPOSITORY} @Inject('REGION_REPOSITORY') private regionRepository
   */
  constructor(
    @Inject(REGION_REPOSITORY)
    private regionRepository: Repository<Region>
  ) { }
  /**
   * Set region
   * @param   {string} title
   * @returns {Promise<IDBResponse>}
   */
  public async setRegion(title: string): Promise<IDBResponse> {
    try {
      let region = new Region();
      region.title = title;

      return this.regionRepository
        .save(region)
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
   * Get region
   * @param   {number} id
   * @returns {Promise<IResponseRegion>}
   */
  public async getRegionById(id: number): Promise<IResponseRegion> {
    try {
      const region = await this.regionRepository.findOne({ id: id });

      return {
        success: true,
        message: 'success',
        data: region
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
