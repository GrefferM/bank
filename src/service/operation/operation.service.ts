import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Operation } from './../../entity/Operation';
import { OperationType } from './../../entity/OperationType';
import { User } from './../../entity/User';
import { IDBResponse } from './../../../interfaces/db.response.interface';
import { IResponseOperation } from './../../../interfaces/operation.response.interface';
import { IResponseOperations } from './../../../interfaces/operations.response.interface';
import {
  OPERATION_REPOSITORY,
  OPERATION_TYPE_REPOSITORY,
  USER_REPOSITORY
} from './../../constants';

@Injectable()
export class OperationService {
  /**
   * Constructor OperationService
   * @param {OPERATION_REPOSITORY}       @Inject('OPERATION_REPOSITORY')      private operationRepository
   * @param {OPERATION_TYPE_REPOSITORY}  @Inject('OPERATION_TYPE_REPOSITORY') private operationTypeRepository
   * @param {USER_REPOSITORY}            @Inject('USER_REPOSITORY')           private userRepository
   */
  constructor(
    @Inject(OPERATION_REPOSITORY)
    private operationRepository: Repository<Operation>,
    @Inject(OPERATION_TYPE_REPOSITORY)
    private operationTypeRepository: Repository<OperationType>,
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>
  ) { }
  /**
   * Set operation
   * @param   {uuid}    payer_id
   * @param   {uuid}    recipient_id
   * @param   {number}  type_id
   * @param   {number}  amount
   * @returns {Promise<IDBResponse>}
   */
  public async setOperation(
    payer_id: string,
    recipient_id: string,
    type_id: number,
    amount: number
  ): Promise<IDBResponse> {
    try {
      const payer = await this.userRepository.findOne({ id: payer_id })
      const recipient = await this.userRepository.findOne({ id: recipient_id })
      const type = await this.operationTypeRepository.findOne({ id: type_id })
      const operation = this.operationRepository.create({
        payer,
        recipient,
        type,
        amount
      })

      return this.operationRepository
        .save(operation)
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
   * Update operation
   * @param   {uuid}    operation_id
   * @param   {uuid}    payer_id
   * @param   {uuid}    recipient_id
   * @param   {number}  type_id
   * @param   {number}  amount
   * @returns {Promise<IDBResponse>}
   */
  public async updateOperation(
    operation_id: string,
    payer_id: string,
    recipient_id: string,
    type_id: number,
    amount: number
  ): Promise<IDBResponse> {
    try {
      const payer = await this.userRepository.findOne({ id: payer_id })
      const recipient = await this.userRepository.findOne({ id: recipient_id })
      const type = await this.operationTypeRepository.findOne({ id: type_id })

      return this.operationRepository
        .save({
          id: operation_id,
          payer,
          recipient,
          type,
          amount
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
   * Delete operation
   * @param   {uuid} operation_id
   * @returns {Promise<IDBResponse>}
   */
  public async deleteOperation(
    operation_id: string
  ): Promise<IDBResponse> {
    try {
      return this.operationRepository
        .delete({ id: operation_id })
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
   * Get operations
   * @returns {Promise<IResponseOperations>}
   */
  public async getOperations(): Promise<IResponseOperations> {
    try {
      const operation = await this.operationRepository.find(
        { relations: ['operation-type', 'payer', 'recipient'] }
      );

      return {
        success: true,
        message: 'success',
        data: operation ? operation : null
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
   * Get operation
   * @param   {uuid} id
   * @returns {Promise<IResponseOperation>}
   */
  public async getOperationById(id: string): Promise<IResponseOperation> {
    try {
      const operation = await this.operationRepository.findOne(
        { id: id },
        { relations: ['operation-type', 'payer', 'recipient'] }
      );

      return {
        success: true,
        message: 'success',
        data: operation ? operation : null
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
