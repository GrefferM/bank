import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { ObligationController } from './../src/controllers/obligation.controller';
import { ObligationModule } from './../src/service/obligation/obligation.module';
import { ObligationService } from './../src/service/obligation/obligation.service';
import {
  DATABASE_CONNECTION,
  OBLIGATION_REPOSITORY,
  USER_REPOSITORY,
  EMPLOYEE_REPOSITORY
} from './../src/constants';
import { IDBResponse } from './../interfaces/db.response.interface';
import { IResponseObligations } from './../interfaces/obligations.response.interface';
import { IResponseObligation } from './../interfaces/obligation.response.interface';
import { responseGetObligations } from './mock/mock.response.get.obligations';
import { responseGetObligation } from './mock/mock.response.get.obligation';
import { responseDB } from './mock/mock.response.db';

describe('ObligationController', () => {
  let app: INestApplication;
  const obligationService = {
    setObligation: () => Promise.resolve(responseDB),
    updateObligation: () => Promise.resolve(responseDB),
    getObligations: () => Promise.resolve(responseGetObligations),
    getObligationById: () => Promise.resolve(responseGetObligation)
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [ObligationModule],
      controllers: [ObligationController]
    })
      .overrideProvider(DATABASE_CONNECTION)
      .useValue({})
      .overrideProvider(OBLIGATION_REPOSITORY)
      .useValue({})
      .overrideProvider(USER_REPOSITORY)
      .useValue({})
      .overrideProvider(EMPLOYEE_REPOSITORY)
      .useValue({})
      .overrideProvider(ObligationService)
      .useValue(obligationService)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /obligation', () => {
    it('execute for get obligation', async () => {
      return request(app.getHttpServer())
        .get('/api/obligation')
        .then((res: { status: number; body: IResponseObligations }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseGetObligations);
        });
    });
  });

  describe('GET /obligation-single', () => {
    it('execute for get obligation by id', async () => {
      return request(app.getHttpServer())
        .get('/api/obligation-single?id=5dec5770-2d8c-11ec-8d3d-0242ac130003')
        .then((res: { status: number; body: IResponseObligation }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseGetObligation);
        });
    });
  });

  describe('SET /obligation', () => {
    it('execute for set obligation', async () => {
      return request(app.getHttpServer())
        .post('/api/obligation')
        .send({
          user_id: '5dec5770-2d8c-11ec-8d3d-0242ac130003',
          employee_id: '5dec5770-2d8c-11ec-8d3d-0242ac130003',
          percent: 1,
          insurance: 1,
          current_amount: 1,
          total_amount: 1,
          debt: true,
        })
        .then((res: { status: number; body: IDBResponse }) => {
          expect(res.status).toBe(201);
          expect(res.body).toEqual(responseDB);
        });
    });

    it('execute for set obligation (failed)', async () => {
      return request(app.getHttpServer())
        .post('/api/obligation')
        .then((res: { status: number; body: IDBResponse }) => {
          expect(res.status).toBe(400);
        });
    });
  });

  describe('UPDATE /obligation', () => {
    it('execute for update obligation', async () => {
      return request(app.getHttpServer())
        .put('/api/obligation')
        .send({
          obligation_id: '5dec5770-2d8c-11ec-8d3d-0242ac130003',
          user_id: '5dec5770-2d8c-11ec-8d3d-0242ac130003',
          employee_id: '5dec5770-2d8c-11ec-8d3d-0242ac130003',
          percent: 1,
          insurance: 1,
          current_amount: 1,
          total_amount: 1,
          debt: true,
        })
        .then((res: { status: number; body: IDBResponse }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseDB);
        });
    });

    it('execute for update obligation (failed)', async () => {
      return request(app.getHttpServer())
        .put('/api/obligation')
        .then((res: { status: number; body: IDBResponse }) => {
          expect(res.status).toBe(400);
        });
    });
  });
});
