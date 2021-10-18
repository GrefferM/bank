import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Obligation } from './../../entity/Obligation';
import { User } from './../../entity/User';
import { Employee } from './../../entity/Employee';
import { IDBResponse } from './../../../interfaces/db.response.interface';
import { IResponseObligation } from './../../../interfaces/obligation.response.interface';
import { IResponseObligations } from './../../../interfaces/obligations.response.interface';
import {
  OBLIGATION_REPOSITORY,
  USER_REPOSITORY,
  EMPLOYEE_REPOSITORY
} from './../../constants';

@Injectable()
export class ObligationService {
  /**
   * Constructor ObligationService
   * @param {OBLIGATION_REPOSITORY} @Inject('OBLIGATION_REPOSITORY') private obligationRepository
   * @param {USER_REPOSITORY}       @Inject('USER_REPOSITORY')       private userRepository
   * @param {EMPLOYEE_REPOSITORY}   @Inject('EMPLOYEE_REPOSITORY')   private employeeRepository
   */
  constructor(
    @Inject(OBLIGATION_REPOSITORY)
    private obligationRepository: Repository<Obligation>,
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
    @Inject(EMPLOYEE_REPOSITORY)
    private employeeRepository: Repository<Employee>
  ) { }
  /**
   * Set obligation
   * @param   {string}  user_id
   * @param   {string}  employee_id
   * @param   {number}  percent
   * @param   {number}  insurance
   * @param   {number}  current_amount
   * @param   {number}  total_amount
   * @param   {boolean} debt
   * @returns {Promise<IDBResponse>}
   */
  public async setObligation(
    user_id: string,
    employee_id: string,
    percent: number,
    insurance: number,
    current_amount: number,
    total_amount: number,
    debt: boolean
  ): Promise<IDBResponse> {
    try {
      const user = await this.userRepository.findOne({ id: user_id })
      const employee = await this.employeeRepository.findOne({ id: employee_id })
      const obligation = this.obligationRepository.create({
        user,
        employee,
        percent,
        insurance,
        current_amount,
        total_amount,
        debt
      })

      return this.obligationRepository
        .save(obligation)
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
   * Get obligations
   * @returns {Promise<IResponseObligations>}
   */
  public async getObligations(): Promise<IResponseObligations> {
    try {
      const obligation = await this.obligationRepository.find();

      return {
        success: true,
        message: 'success',
        data: obligation ? obligation : null
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
   * Get obligation
   * @param   {uuid} id
   * @returns {Promise<IResponseObligation>}
   */
  public async getObligationById(id: string): Promise<IResponseObligation> {
    try {
      const obligation = await this.obligationRepository.findOne({ id: id });

      return {
        success: true,
        message: 'success',
        data: obligation ? obligation : null
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
