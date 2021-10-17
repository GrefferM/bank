import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AccountTypeController } from './../src/controllers/account.type.controller';
import { AccountTypeModule } from './../src/service/account-type/account-type.module';
import { AccountTypeService } from './../src/service/account-type/account-type.service';
import { 
  DATABASE_CONNECTION, 
  ACCOUNT_TYPE_REPOSITORY
} from './../src/constants';
import { IDBResponse } from './../interfaces/db.response.interface';
import { IResponseAccountTypes } from './../interfaces/account.types.response.interface';
import { IResponseAccountType } from './../interfaces/account.type.response.interface';
import { responseGetAccountTypes } from './mock/mock.response.get.account.types';
import { responseGetAccountType } from './mock/mock.response.get.account.type';
import { responseDB } from './mock/mock.response.db';

describe('AccountTypeController', () => {
  let app: INestApplication;
  const accountService = {
    setAccountType: () => Promise.resolve(responseDB),
    getAccountTypes: () => Promise.resolve(responseGetAccountTypes),
    getAccountTypeById: () => Promise.resolve(responseGetAccountType)
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AccountTypeModule],
      controllers: [AccountTypeController]
    })
      .overrideProvider(DATABASE_CONNECTION)
      .useValue({})
      .overrideProvider(ACCOUNT_TYPE_REPOSITORY)
      .useValue({})
      .overrideProvider(AccountTypeService)
      .useValue(accountService)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /account-type', () => {
    it('execute for get account type', async () => {
      return request(app.getHttpServer())
        .get('/api/account-type')
        .then((res: { status: number; body: IResponseAccountTypes }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseGetAccountTypes);
        });
    });
  });

  describe('GET /account-type-single', () => {
    it('execute for get account type by id', async () => {
      return request(app.getHttpServer())
        .get('/api/account-type-single?id=1')
        .then((res: { status: number; body: IResponseAccountType }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseGetAccountType);
        });
    });
  });

  describe('SET /account-type', () => {
    it('execute for set account type', async () => {
      return request(app.getHttpServer())
        .post('/api/account-type')
        .send({
          title: 'Test',
          debit: true
        })
        .then((res: { status: number; body: IDBResponse }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseDB);
        });
    });

    it('execute for set account type (failed)', async () => {
      return request(app.getHttpServer())
        .post('/api/account-type')
        .then((res: { status: number; body: IDBResponse }) => {
          expect(res.status).toBe(400);
        });
    });
  });
});
