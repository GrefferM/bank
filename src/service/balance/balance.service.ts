import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Balance } from './../../entity/Balance';
import { IDBResponse } from './../../../interfaces/db.response.interface';
import { IResponseBalance } from './../../../interfaces/balance.response.interface';
import { IResponseBalances } from './../../../interfaces/balances.response.interface';
import {
  BALANCE_REPOSITORY
} from './../../constants';

@Injectable()
export class BalanceService {
  /**
   * Constructor BalanceService
   * @param {BALANCE_REPOSITORY} @Inject('BALANCE_REPOSITORY') private balanceRepository
   */
  constructor(
    @Inject(BALANCE_REPOSITORY)
    private balanceRepository: Repository<Balance>,
  ) { }
  /**
   * Set balances
   * @param   {number}  amount
   * @param   {boolean} debt
   * @returns {Promise<IDBResponse>}
   */
  public async setBalance(
    amount: number,
    debt: boolean
  ): Promise<IDBResponse> {
    try {
      const balance = this.balanceRepository.create({
        amount,
        debt
      })

      return this.balanceRepository
        .save(balance)
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
   * Get balances
   * @returns {Promise<IResponseBalances>}
   */
  public async getBalances(): Promise<IResponseBalances> {
    try {
      const balance = await this.balanceRepository.find();

      return {
        success: true,
        message: 'success',
        data: balance ? balance : null
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
   * Get balance
   * @param   {uuid} id
   * @returns {Promise<IResponseBalance>}
   */
  public async getBalanceById(id: string): Promise<IResponseBalance> {
    try {
      const balance = await this.balanceRepository.findOne({ id: id });

      return {
        success: true,
        message: 'success',
        data: balance ? balance : null
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
