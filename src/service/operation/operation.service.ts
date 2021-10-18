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
   * @param   {string}  payer_id
   * @param   {string}  recipient_id
   * @param   {number}  type_id
   * @returns {Promise<IDBResponse>}
   */
  public async setOperation(
    payer_id: string,
    recipient_id: string,
    type_id: number
  ): Promise<IDBResponse> {
    try {
      const payer = await this.userRepository.findOne({ id: payer_id })
      const recipient = await this.userRepository.findOne({ id: recipient_id })
      const type = await this.operationTypeRepository.findOne({ id: type_id })
      const operation = this.operationRepository.create({
        payer,
        recipient,
        type
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
   * Get operations
   * @returns {Promise<IResponseOperations>}
   */
  public async getOperations(): Promise<IResponseOperations> {
    try {
      const operation = await this.operationRepository.find();

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
      const operation = await this.operationRepository.findOne({ id: id });

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
