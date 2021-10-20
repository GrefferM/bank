import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Region } from './../../entity/Region';
import { IDBResponse } from './../../../interfaces/db.response.interface';
import { IResponseRegion } from './../../../interfaces/region.response.interface';
import { IResponseRegions } from './../../../interfaces/regions.response.interface';
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
   * Update region
   * @param   {number} region_id
   * @param   {string} title
   * @returns {Promise<IDBResponse>}
   */
  public async updateRegion(region_id: number, title: string): Promise<IDBResponse> {
    try {
      return this.regionRepository
        .save({
          id: region_id,
          title
        })
        .then(() => {
          return {
            success: true,
            message: 'update'
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
   * Delete region
   * @param   {number} region_id
   * @returns {Promise<IDBResponse>}
   */
  public async deleteRegion(region_id: number): Promise<IDBResponse> {
    try {
      return this.regionRepository
        .delete({ id: region_id })
        .then(() => {
          return {
            success: true,
            message: 'delete'
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
   * Get regions
   * @returns {Promise<IResponseRegions>}
   */
  public async getRegions(): Promise<IResponseRegions> {
    try {
      const region = await this.regionRepository.find();

      return {
        success: true,
        message: 'success',
        data: region ? region : null
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
        data: region ? region : null
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
