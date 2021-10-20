import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UserController } from './../src/controllers/user.controller';
import { UserModule } from './../src/service/user/user.module';
import { UserService } from './../src/service/user/user.service';
import { DATABASE_CONNECTION, USER_REPOSITORY, CITY_REPOSITORY } from './../src/constants';
import { IDBResponse } from './../interfaces/db.response.interface';
import { IResponseUser } from './../interfaces/user.response.interface';
import { IResponseUsers } from './../interfaces/users.response.interface';
import { responseGetUser } from './mock/mock.response.get.user';
import { responseGetUsers } from './mock/mock.response.get.users';
import { responseDB } from './mock/mock.response.db';

describe('UserController', () => {
  let app: INestApplication;
  const userService = {
    setUser: () => Promise.resolve(responseDB),
    updateUser: () => Promise.resolve(responseDB),
    deleteUser: () => Promise.resolve(responseDB),
    getUsers: () => Promise.resolve(responseGetUsers),
    getUserById: () => Promise.resolve(responseGetUser)
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
      controllers: [UserController]
    })
      .overrideProvider(DATABASE_CONNECTION)
      .useValue({})
      .overrideProvider(USER_REPOSITORY)
      .useValue({})
      .overrideProvider(CITY_REPOSITORY)
      .useValue({})
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /user', () => {
    it('execute for get user', async () => {
      return request(app.getHttpServer())
        .get('/api/user')
        .then((res: { status: number; body: IResponseUsers }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseGetUsers);
        });
    });
  });

  describe('GET /user-single', () => {
    it('execute for get user by id', async () => {
      return request(app.getHttpServer())
        .get('/api/user-single?id=5dec5770-2d8c-11ec-8d3d-0242ac130003')
        .then((res: { status: number; body: IResponseUser }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseGetUser);
        });
    });
  });

  describe('SET /user', () => {
    it('execute for set user', async () => {
      return request(app.getHttpServer())
        .post('/api/user')
        .send({
          name: 'TEST_FIO',
          phone: '380977777777',
          email: 'test@test.com',
          address: 'street 21',
          city_id: 1
        })
        .then((res: { status: number; body: IDBResponse }) => {
          expect(res.status).toBe(201);
          expect(res.body).toEqual(responseDB);
        });
    });

    it('execute for set user (failed)', async () => {
      return request(app.getHttpServer())
        .post('/api/user')
        .then((res: { status: number; body: IDBResponse }) => {
          expect(res.status).toBe(400);
        });
    });
  });

  describe('UPDATE /user', () => {
    it('execute for update user', async () => {
      return request(app.getHttpServer())
        .put('/api/user')
        .send({
          user_id: '5dec5770-2d8c-11ec-8d3d-0242ac130003',
          name: 'TEST_FIO',
          phone: '380977777777',
          email: 'test@test.com',
          address: 'street 21',
          city_id: 1
        })
        .then((res: { status: number; body: IDBResponse }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseDB);
        });
    });

    it('execute for update user (failed)', async () => {
      return request(app.getHttpServer())
        .put('/api/user')
        .then((res: { status: number; body: IDBResponse }) => {
          expect(res.status).toBe(400);
        });
    });
  });

  describe('DELETE /user', () => {
    it('execute for delete user', async () => {
      return request(app.getHttpServer())
        .delete('/api/user')
        .send({
          user_id: '5dec5770-2d8c-11ec-8d3d-0242ac130003'
        })
        .then((res: { status: number; body: IDBResponse }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseDB);
        });
    });

    it('execute for update delete (failed)', async () => {
      return request(app.getHttpServer())
        .delete('/api/user')
        .then((res: { status: number; body: IDBResponse }) => {
          expect(res.status).toBe(400);
        });
    });
  });
});
