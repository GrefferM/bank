import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OperationType } from './../../entity/OperationType';
import { IDBResponse } from './../../../interfaces/db.response.interface';
import { IResponseOperationType } from './../../../interfaces/operation.type.response.interface';
import { IResponseOperationTypes } from './../../../interfaces/operation.types.response.interface';
import {
  OPERATION_TYPE_REPOSITORY
} from './../../constants';

@Injectable()
export class OperationTypeService {
  /**
   * Constructor OperationTypeService
   * @param {OPERATION_TYPE_REPOSITORY} @Inject('OPERATION_TYPE_REPOSITORY') private operationTypeRepository
   */
  constructor(
    @Inject(OPERATION_TYPE_REPOSITORY)
    private operationTypeRepository: Repository<OperationType>
  ) { }
  /**
   * Set operation type
   * @param   {string}  title
   * @param   {number}  commission
   * @returns {Promise<IDBResponse>}
   */
  public async setOperationType(
    title: string,
    commission: number
  ): Promise<IDBResponse> {
    try {
      const operation_type = this.operationTypeRepository.create({
        title,
        commission
      })

      return this.operationTypeRepository
        .save(operation_type)
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
   * Update operation type
   * @param   {number}  type_id
   * @param   {string}  title
   * @param   {number}  commission
   * @returns {Promise<IDBResponse>}
   */
  public async updateOperationType(
    type_id: number,
    title: string,
    commission: number
  ): Promise<IDBResponse> {
    try {
      return this.operationTypeRepository
        .save({
          id: type_id,
          title,
          commission
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
   * Delete operation type
   * @param   {number} type_id
   * @returns {Promise<IDBResponse>}
   */
  public async deleteOperationType(
    type_id: number,
  ): Promise<IDBResponse> {
    try {
      return this.operationTypeRepository
        .delete({ id: type_id })
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
   * Get operation types
   * @returns {Promise<IResponseOperationTypes>}
   */
  public async getOperationTypes(): Promise<IResponseOperationTypes> {
    try {
      const operation_type = await this.operationTypeRepository.find();

      return {
        success: true,
        message: 'success',
        data: operation_type ? operation_type : null
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
   * Get operation type
   * @param   {number} id
   * @returns {Promise<IResponseOperationType>}
   */
  public async getOperationTypeById(id: number): Promise<IResponseOperationType> {
    try {
      const operation_type = await this.operationTypeRepository.findOne({ id: id });

      return {
        success: true,
        message: 'success',
        data: operation_type ? operation_type : null
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
