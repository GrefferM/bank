import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { BalanceController } from './../src/controllers/balance.controller';
import { BalanceModule } from './../src/service/balance/balance.module';
import { BalanceService } from './../src/service/balance/balance.service';
import { 
  DATABASE_CONNECTION, 
  BALANCE_REPOSITORY
} from './../src/constants';
import { IDBResponse } from './../interfaces/db.response.interface';
import { IResponseBalances } from './../interfaces/balances.response.interface';
import { IResponseBalance } from './../interfaces/balance.response.interface';
import { responseGetBalances } from './mock/mock.response.get.balances';
import { responseGetBalance } from './mock/mock.response.get.balance';
import { responseDB } from './mock/mock.response.db';

describe('BalanceController', () => {
  let app: INestApplication;
  const balanceService = {
    setBalance: () => Promise.resolve(responseDB),
    getBalances: () => Promise.resolve(responseGetBalances),
    getBalanceById: () => Promise.resolve(responseGetBalance)
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [BalanceModule],
      controllers: [BalanceController]
    })
      .overrideProvider(DATABASE_CONNECTION)
      .useValue({})
      .overrideProvider(BALANCE_REPOSITORY)
      .useValue({})
      .overrideProvider(BalanceService)
      .useValue(balanceService)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /balance', () => {
    it('execute for get balance', async () => {
      return request(app.getHttpServer())
        .get('/api/balance')
        .then((res: { status: number; body: IResponseBalances }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseGetBalances);
        });
    });
  });

  describe('GET /balance-single', () => {
    it('execute for get balance by id', async () => {
      return request(app.getHttpServer())
        .get('/api/balance-single?id=5dec5770-2d8c-11ec-8d3d-0242ac130003')
        .then((res: { status: number; body: IResponseBalance }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseGetBalance);
        });
    });
  });

  describe('SET /balance', () => {
    it('execute for set balance', async () => {
      return request(app.getHttpServer())
        .post('/api/balance')
        .send({
          amount: 1,
          debt: true
        })
        .then((res: { status: number; body: IDBResponse }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseDB);
        });
    });

    it('execute for set balance (failed)', async () => {
      return request(app.getHttpServer())
        .post('/api/balance')
        .then((res: { status: number; body: IDBResponse }) => {
          expect(res.status).toBe(400);
        });
    });
  });
});
