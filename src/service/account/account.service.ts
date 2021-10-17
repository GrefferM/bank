import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Account } from './../../entity/Account';
import { AccountType } from './../../entity/AccountType';
import { User } from './../../entity/User';
import { Employee } from './../../entity/Employee';
import { IDBResponse } from './../../../interfaces/db.response.interface';
import { IResponseAccount } from './../../../interfaces/account.response.interface';
import { IResponseAccounts } from './../../../interfaces/accounts.response.interface';
import { 
  ACCOUNT_REPOSITORY, 
  ACCOUNT_TYPE_REPOSITORY, 
  USER_REPOSITORY, 
  EMPLOYEE_REPOSITORY 
} from './../../constants';

@Injectable()
export class AccountService {
  /**
   * Constructor AccountService
   * @param {ACCOUNT_REPOSITORY}      @Inject('ACCOUNT_REPOSITORY')      private accountRepository
   * @param {ACCOUNT_TYPE_REPOSITORY} @Inject('ACCOUNT_TYPE_REPOSITORY') private accountTypeRepository
   * @param {USER_REPOSITORY}         @Inject('USER_REPOSITORY')         private userRepository
   * @param {EMPLOYEE_REPOSITORY}     @Inject('EMPLOYEE_REPOSITORY')     private employeeRepository
   */
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private accountRepository: Repository<Account>,
    @Inject(ACCOUNT_TYPE_REPOSITORY)
    private accountTypeRepository: Repository<AccountType>,
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
    @Inject(EMPLOYEE_REPOSITORY)
    private employeeRepository: Repository<Employee>
  ) { }
  /**
   * Set account
   * @param   {number} type_id
   * @param   {string} user_id
   * @param   {string} employee_id
   * @returns {Promise<IDBResponse>}
   */
  public async setAccount(
    type_id: number,
    user_id: string,
    employee_id: string
  ): Promise<IDBResponse> {
    try {
      const type = await this.accountTypeRepository.findOne({ id: type_id })
      const user = await this.userRepository.findOne({ id: user_id })
      const employee = await this.employeeRepository.findOne({ id: employee_id })
      const account = this.accountRepository.create({
        type,
        user,
        employee
      })

      return this.accountRepository
        .save(account)
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
   * Get accounts
   * @returns {Promise<IResponseAccounts>}
   */
  public async getAccounts(): Promise<IResponseAccounts> {
    try {
      const account = await this.accountRepository.find();

      return {
        success: true,
        message: 'success',
        data: account ? account : null
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
   * Get account
   * @param   {number} id
   * @returns {Promise<IResponseAccount>}
   */
  public async getAccountById(id: number): Promise<IResponseAccount> {
    try {
      const account = await this.accountRepository.findOne({ id: id });

      return {
        success: true,
        message: 'success',
        data: account ? account : null
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
