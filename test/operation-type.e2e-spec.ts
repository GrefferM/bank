import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { OperationTypeController } from './../src/controllers/operation.type.controller';
import { OperationTypeModule } from './../src/service/operation-type/operation-type.module';
import { OperationTypeService } from './../src/service/operation-type/operation-type.service';
import { 
  DATABASE_CONNECTION,
  OPERATION_TYPE_REPOSITORY
} from './../src/constants';
import { IDBResponse } from './../interfaces/db.response.interface';
import { IResponseOperationTypes } from './../interfaces/operation.types.response.interface';
import { IResponseOperationType } from './../interfaces/operation.type.response.interface';
import { responseGetOperationTypes } from './mock/mock.response.get.operation.types';
import { responseGetOperationType } from './mock/mock.response.get.operation.type';
import { responseDB } from './mock/mock.response.db';

describe('OperationTypeController', () => {
  let app: INestApplication;
  const operationTypeService = {
    setOperationType: () => Promise.resolve(responseDB),
    getOperationTypes: () => Promise.resolve(responseGetOperationTypes),
    getOperationTypeById: () => Promise.resolve(responseGetOperationType)
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [OperationTypeModule],
      controllers: [OperationTypeController]
    })
      .overrideProvider(DATABASE_CONNECTION)
      .useValue({})
      .overrideProvider(OPERATION_TYPE_REPOSITORY)
      .useValue({})
      .overrideProvider(OperationTypeService)
      .useValue(operationTypeService)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /operation-type', () => {
    it('execute for get operation types', async () => {
      return request(app.getHttpServer())
        .get('/api/operation-type')
        .then((res: { status: number; body: IResponseOperationTypes }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseGetOperationTypes);
        });
    });
  });

  describe('GET /operation-single-type', () => {
    it('execute for get operation type by id', async () => {
      return request(app.getHttpServer())
        .get('/api/operation-type-single?id=5dec5770-2d8c-11ec-8d3d-0242ac130003')
        .then((res: { status: number; body: IResponseOperationType }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseGetOperationType);
        });
    });
  });

  describe('SET /operation-type', () => {
    it('execute for set operation type', async () => {
      return request(app.getHttpServer())
        .post('/api/operation-type')
        .send({
          title: 'Test',
          commission: 1
        })
        .then((res: { status: number; body: IDBResponse }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseDB);
        });
    });

    it('execute for set operation type (failed)', async () => {
      return request(app.getHttpServer())
        .post('/api/operation-type')
        .then((res: { status: number; body: IDBResponse }) => {
          expect(res.status).toBe(400);
        });
    });
  });
});
