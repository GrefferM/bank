import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { OperationController } from './../src/controllers/operation.controller';
import { OperationModule } from './../src/service/operation/operation.module';
import { OperationService } from './../src/service/operation/operation.service';
import { 
  DATABASE_CONNECTION, 
  OPERATION_REPOSITORY,
  OPERATION_TYPE_REPOSITORY,
  USER_REPOSITORY
} from './../src/constants';
import { IDBResponse } from './../interfaces/db.response.interface';
import { IResponseOperations } from './../interfaces/operations.response.interface';
import { IResponseOperation } from './../interfaces/operation.response.interface';
import { responseGetOperations } from './mock/mock.response.get.operations';
import { responseGetOperation } from './mock/mock.response.get.operation';
import { responseDB } from './mock/mock.response.db';

describe('OperationController', () => {
  let app: INestApplication;
  const operationService = {
    setOperation: () => Promise.resolve(responseDB),
    getOperations: () => Promise.resolve(responseGetOperations),
    getOperationById: () => Promise.resolve(responseGetOperation)
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [OperationModule],
      controllers: [OperationController]
    })
      .overrideProvider(DATABASE_CONNECTION)
      .useValue({})
      .overrideProvider(OPERATION_REPOSITORY)
      .useValue({})
      .overrideProvider(OPERATION_TYPE_REPOSITORY)
      .useValue({})
      .overrideProvider(USER_REPOSITORY)
      .useValue({})
      .overrideProvider(OperationService)
      .useValue(operationService)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /operation', () => {
    it('execute for get operation', async () => {
      return request(app.getHttpServer())
        .get('/api/operation')
        .then((res: { status: number; body: IResponseOperations }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseGetOperations);
        });
    });
  });

  describe('GET /operation-single', () => {
    it('execute for get operation by id', async () => {
      return request(app.getHttpServer())
        .get('/api/operation-single?id=5dec5770-2d8c-11ec-8d3d-0242ac130003')
        .then((res: { status: number; body: IResponseOperation }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseGetOperation);
        });
    });
  });

  describe('SET /operation', () => {
    it('execute for set operation', async () => {
      return request(app.getHttpServer())
        .post('/api/operation')
        .send({
          payer_id: '5dec5770-2d8c-11ec-8d3d-0242ac130003',
          recipient_id: '5dec5770-2d8c-11ec-8d3d-0242ac130003',
          type_id: 1
        })
        .then((res: { status: number; body: IDBResponse }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseDB);
        });
    });

    it('execute for set operation (failed)', async () => {
      return request(app.getHttpServer())
        .post('/api/operation')
        .then((res: { status: number; body: IDBResponse }) => {
          expect(res.status).toBe(400);
        });
    });
  });
});
