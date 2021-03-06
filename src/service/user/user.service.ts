import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './../../entity/User';
import { City } from './../../entity/City';
import { IDBResponse } from './../../../interfaces/db.response.interface';
import { IResponseUser } from './../../../interfaces/user.response.interface';
import { IResponseUsers } from './../../../interfaces/users.response.interface';
import { CITY_REPOSITORY, USER_REPOSITORY } from './../../constants';

@Injectable()
export class UserService {
  /**
   * Constructor UserService
   * @param {USER_REPOSITORY} @Inject('USER_REPOSITORY') private userRepository
   * @param {CITY_REPOSITORY} @Inject('CITY_REPOSITORY') private cityRepository
   */
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
    @Inject(CITY_REPOSITORY)
    private cityRepository: Repository<City>
  ) { }
  /**
   * Set user
   * @param   {string} name
   * @param   {string} phone
   * @param   {string} email
   * @param   {string} address
   * @param   {number} city
   * @returns {Promise<IDBResponse>}
   */
  public async setUser(
    name: string,
    phone: string,
    email: string,
    address: string,
    city_id: number
  ): Promise<IDBResponse> {
    try {
      const city = await this.cityRepository.findOne({ id: city_id })
      const user = this.userRepository.create({
        name,
        phone,
        email,
        address,
        city
      })

      return this.userRepository
        .save(user)
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
   * Update user
   * @param   {uuid}   user_id
   * @param   {string} name
   * @param   {string} phone
   * @param   {string} email
   * @param   {string} address
   * @param   {number} city
   * @returns {Promise<IDBResponse>}
   */
  public async updateUser(
    user_id: string,
    name: string,
    phone: string,
    email: string,
    address: string,
    city_id: number
  ): Promise<IDBResponse> {
    try {
      const city = await this.cityRepository.findOne({ id: city_id })

      return this.userRepository
        .save({
          id: user_id,
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
   * Delete user
   * @param   {uuid} user_id
   * @returns {Promise<IDBResponse>}
   */
  public async deleteUser(
    user_id: string
  ): Promise<IDBResponse> {
    try {
      return this.userRepository
        .delete({ id: user_id })
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
   * Get users
   * @returns {Promise<IResponseUsers>}
   */
  public async getUsers(): Promise<IResponseUsers> {
    try {
      const user = await this.userRepository.find();

      return {
        success: true,
        message: 'success',
        data: user ? user : null
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
   * Get user
   * @param   {uuid} id
   * @returns {Promise<IResponseUser>}
   */
  public async getUserById(id: string): Promise<IResponseUser> {
    try {
      const user = await this.userRepository.findOne({ id: id });

      return {
        success: true,
        message: 'success',
        data: user ? user : null
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
