import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AccountController } from './../src/controllers/account.controller';
import { AccountModule } from './../src/service/account/account.module';
import { AccountService } from './../src/service/account/account.service';
import { 
  DATABASE_CONNECTION, 
  ACCOUNT_REPOSITORY, 
  ACCOUNT_TYPE_REPOSITORY, 
  USER_REPOSITORY, 
  EMPLOYEE_REPOSITORY 
} from './../src/constants';
import { IDBResponse } from './../interfaces/db.response.interface';
import { IResponseAccounts } from './../interfaces/accounts.response.interface';
import { IResponseAccount } from './../interfaces/account.response.interface';
import { responseGetAccounts } from './mock/mock.response.get.accounts';
import { responseGetAccount } from './mock/mock.response.get.account';
import { responseDB } from './mock/mock.response.db';

describe('AccountController', () => {
  let app: INestApplication;
  const accountService = {
    setAccount: () => Promise.resolve(responseDB),
    getAccounts: () => Promise.resolve(responseGetAccounts),
    getAccountById: () => Promise.resolve(responseGetAccount)
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AccountModule],
      controllers: [AccountController]
    })
      .overrideProvider(DATABASE_CONNECTION)
      .useValue({})
      .overrideProvider(ACCOUNT_REPOSITORY)
      .useValue({})
      .overrideProvider(ACCOUNT_TYPE_REPOSITORY)
      .useValue({})
      .overrideProvider(USER_REPOSITORY)
      .useValue({})
      .overrideProvider(EMPLOYEE_REPOSITORY)
      .useValue({})
      .overrideProvider(AccountService)
      .useValue(accountService)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /account', () => {
    it('execute for get account', async () => {
      return request(app.getHttpServer())
        .get('/api/account')
        .then((res: { status: number; body: IResponseAccounts }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseGetAccounts);
        });
    });
  });

  describe('GET /account-single', () => {
    it('execute for get account by id', async () => {
      return request(app.getHttpServer())
        .get('/api/account-single?id=5dec5770-2d8c-11ec-8d3d-0242ac130003')
        .then((res: { status: number; body: IResponseAccount }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseGetAccount);
        });
    });
  });

  describe('SET /account', () => {
    it('execute for set account', async () => {
      return request(app.getHttpServer())
        .post('/api/account')
        .send({
          type_id: 1,
          user_id: '5dec5770-2d8c-11ec-8d3d-0242ac130003',
          employee_id: '5dec5770-2d8c-11ec-8d3d-0242ac130003'
        })
        .then((res: { status: number; body: IDBResponse }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseDB);
        });
    });

    it('execute for set account (failed)', async () => {
      return request(app.getHttpServer())
        .post('/api/account')
        .then((res: { status: number; body: IDBResponse }) => {
          expect(res.status).toBe(400);
        });
    });
  });
});
