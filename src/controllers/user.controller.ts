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
import { Error } from './../../shared/entity/error.entity';
import { ResponseEntity } from './../../shared/entity/response.entity';
import { GetUsersEntity } from './../../shared/entity/get.users.entity';
import { GetUserEntity } from './../../shared/entity/get.user.entity';

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
   * @param   {number} city
   * @returns {Promise<IDBResponse>}
   */
  @ApiTags('User')
  @ApiBody({ type: SetUserDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Succesfull save user',
    type: ResponseEntity
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
      body.city
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
    type: GetUsersEntity
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
    type: GetUserEntity
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
