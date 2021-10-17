import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AccountType } from './../../entity/AccountType';
import { IDBResponse } from './../../../interfaces/db.response.interface';
import { IResponseAccountType } from './../../../interfaces/account.type.response.interface';
import { IResponseAccountTypes } from './../../../interfaces/account.types.response.interface';
import { ACCOUNT_TYPE_REPOSITORY } from './../../constants';

@Injectable()
export class AccountTypeService {
  /**
   * Constructor AccountTypeService
   * @param {ACCOUNT_TYPE_REPOSITORY}  @Inject('ACCOUNT_TYPE_REPOSITORY')  private accountTypeRepository
   */
  constructor(
    @Inject(ACCOUNT_TYPE_REPOSITORY)
    private accountTypeRepository: Repository<AccountType>
  ) { }
  /**
   * Set account type
   * @param   {string}  title
   * @param   {boolean} debit
   * @returns {Promise<IDBResponse>}
   */
  public async setAccountType(title: string, debit: boolean): Promise<IDBResponse> {
    try {
      const account_type = this.accountTypeRepository.create({
        title,
        debit
      })

      return this.accountTypeRepository
        .save(account_type)
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
   * Get account types
   * @returns {Promise<IResponseAccountTypes>}
   */
  public async getAccountTypes(): Promise<IResponseAccountTypes> {
    try {
      const account_type = await this.accountTypeRepository.find();

      return {
        success: true,
        message: 'success',
        data: account_type ? account_type : null
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
   * Get account type
   * @param   {number} id
   * @returns {Promise<IResponseAccountType>}
   */
  public async getAccountTypeById(id: number): Promise<IResponseAccountType> {
    try {
      const account_type = await this.accountTypeRepository.findOne({ id: id });

      return {
        success: true,
        message: 'success',
        data: account_type ? account_type : null
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
