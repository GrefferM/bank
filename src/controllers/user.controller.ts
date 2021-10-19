import {
  Inject,
  Controller,
  Post,
  Get,
  Body,
  Query,
  HttpStatus,
  HttpCode,
  UseFilters
} from '@nestjs/common';
import {
  ApiQuery,
  ApiResponse,
  ApiBody,
  ApiTags
} from '@nestjs/swagger';
import { AllExceptionsFilter } from './../../shared/filter/http-exception.filter';
import { UserService } from './../../src/service/user/user.service';
import { IDBResponse } from './../../interfaces/db.response.interface';
import { IResponseUser } from './../../interfaces/user.response.interface';
import { IResponseUsers } from './../../interfaces/users.response.interface';
import { SetUserDTO } from './../../shared/dto/set.user.dto';
import { GetUserDTO } from './../../shared/dto/get.user.dto';
import { Error } from '../../shared/response/error.response';
import { Response } from '../../shared/response/response.response';
import { GetUsersResponse } from '../../shared/response/get.users.response';
import { GetUserResponse } from '../../shared/response/get.user.response';

@Controller('api')
export class UserController {
  /**
   * Constructor UserController
   * @param {UserService} @Inject('UserService') private userService
   */
  constructor(
    @Inject(UserService)
    private userService: UserService
  ) { }
  /**
   * Set user
   * @param   {string} name
   * @param   {string} phone
   * @param   {string} email
   * @param   {string} address
   * @param   {number} city_id
   * @returns {Promise<IDBResponse>}
   */
  @ApiTags('User')
  @ApiBody({ type: SetUserDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull save user',
    type: Response
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Post('user')
  @HttpCode(HttpStatus.OK)
  setUserHandler(@Body() body: SetUserDTO): Promise<IDBResponse> {
    return this.userService.setUser(
      body.name,
      body.phone,
      body.email,
      body.address,
      body.city_id
    );
  }
  /**
   * Get users
   * @returns {Promise<IResponseUsers>}
   */
  @ApiTags('User')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull get users',
    type: GetUsersResponse
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Get('user')
  @HttpCode(HttpStatus.OK)
  getUsersHandler(): Promise<IResponseUsers> {
    return this.userService.getUsers();
  }
  /**
   * Get user by id
   * @param   {uuid} id
   * @returns {Promise<IResponseUser>}
   */
  @ApiTags('User')
  @ApiQuery({ type: GetUserDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull get user',
    type: GetUserResponse
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error',
    type: Error
  })
  @UseFilters(AllExceptionsFilter)
  @Get('user-single')
  @HttpCode(HttpStatus.OK)
  getUserByIdHandler(@Query() query: GetUserDTO): Promise<IResponseUser> {
    return this.userService.getUserById(query.id);
  }
}
