import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Employee } from './../../entity/Employee';
import { City } from './../../entity/City';
import { IDBResponse } from './../../../interfaces/db.response.interface';
import { IResponseEmployee } from './../../../interfaces/employee.response.interface';
import { IResponseEmployes } from './../../../interfaces/employes.response.interface';
import { CITY_REPOSITORY, EMPLOYEE_REPOSITORY } from './../../constants';

@Injectable()
export class EmployeeService {
  /**
   * Constructor EmployeeService
   * @param {EMPLOYEE_REPOSITORY} @Inject('EMPLOYEE_REPOSITORY') private employeeRepository
   * @param {CITY_REPOSITORY}     @Inject('CITY_REPOSITORY')     private cityRepository
   */
  constructor(
    @Inject(EMPLOYEE_REPOSITORY)
    private employeeRepository: Repository<Employee>,
    @Inject(CITY_REPOSITORY)
    private cityRepository: Repository<City>
  ) { }
  /**
   * Set employee
   * @param   {string} name
   * @param   {string} phone
   * @param   {string} email
   * @param   {string} address
   * @param   {number} city_id
   * @returns {Promise<IDBResponse>}
   */
  public async setEmployee(
    name: string,
    phone: string,
    email: string,
    address: string,
    city_id: number
  ): Promise<IDBResponse> {
    try {
      const city = await this.cityRepository.findOne({ id: city_id })
      const employee = this.employeeRepository.create({
        name,
        phone,
        email,
        address,
        city
      })

      return this.employeeRepository
        .save(employee)
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
   * Update employee
   * @param   {uuid}   employee_id
   * @param   {string} name
   * @param   {string} phone
   * @param   {string} email
   * @param   {string} address
   * @param   {number} city_id
   * @returns {Promise<IDBResponse>}
   */
  public async updateEmployee(
    employee_id: string,
    name: string,
    phone: string,
    email: string,
    address: string,
    city_id: number
  ): Promise<IDBResponse> {
    try {
      const city = await this.cityRepository.findOne({ id: city_id })

      return this.employeeRepository
        .save({
          id: employee_id,
          name,
          phone,
          email,
          address,
          city
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
   * Get employes
   * @returns {Promise<IResponseEmployes>}
   */
  public async getEmployes(): Promise<IResponseEmployes> {
    try {
      const employee = await this.employeeRepository.find();

      return {
        success: true,
        message: 'success',
        data: employee ? employee : null
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
   * Get employee
   * @param   {uuid} id
   * @returns {Promise<IResponseEmployee>}
   */
  public async getEmployeeById(id: string): Promise<IResponseEmployee> {
    try {
      const employee = await this.employeeRepository.findOne({ id: id });

      return {
        success: true,
        message: 'success',
        data: employee ? employee : null
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
