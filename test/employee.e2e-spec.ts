import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { EmployeeController } from './../src/controllers/employee.controller';
import { EmployeeModule } from './../src/service/employee/employee.module';
import { EmployeeService } from './../src/service/employee/employee.service';
import { DATABASE_CONNECTION, EMPLOYEE_REPOSITORY, CITY_REPOSITORY } from './../src/constants';
import { IDBResponse } from './../interfaces/db.response.interface';
import { IResponseEmployee } from './../interfaces/employee.response.interface';
import { IResponseEmployes } from './../interfaces/employes.response.interface';
import { responseGetEmployee } from './mock/mock.response.get.employee';
import { responseGetEmployes } from './mock/mock.response.get.employes';
import { responseDB } from './mock/mock.response.db';

describe('EmployeController', () => {
  let app: INestApplication;
  const employeService = {
    setEmployee: () => Promise.resolve(responseDB),
    updateEmployee: () => Promise.resolve(responseDB),
    getEmployes: () => Promise.resolve(responseGetEmployes),
    getEmployeeById: () => Promise.resolve(responseGetEmployee)
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [EmployeeModule],
      controllers: [EmployeeController]
    })
      .overrideProvider(DATABASE_CONNECTION)
      .useValue({})
      .overrideProvider(EMPLOYEE_REPOSITORY)
      .useValue({})
      .overrideProvider(CITY_REPOSITORY)
      .useValue({})
      .overrideProvider(EmployeeService)
      .useValue(employeService)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /employe', () => {
    it('execute for get employe', async () => {
      return request(app.getHttpServer())
        .get('/api/employee')
        .then((res: { status: number; body: IResponseEmployes }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseGetEmployes);
        });
    });
  });

  describe('GET /employe-single', () => {
    it('execute for get employe by id', async () => {
      return request(app.getHttpServer())
        .get('/api/employee-single?id=5dec5770-2d8c-11ec-8d3d-0242ac130003')
        .then((res: { status: number; body: IResponseEmployee }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseGetEmployee);
        });
    });
  });

  describe('SET /employe', () => {
    it('execute for set employe', async () => {
      return request(app.getHttpServer())
        .post('/api/employee')
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

    it('execute for set employe (failed)', async () => {
      return request(app.getHttpServer())
        .post('/api/employee')
        .then((res: { status: number; body: IDBResponse }) => {
          expect(res.status).toBe(400);
        });
    });
  });

  describe('UPDATE /employe', () => {
    it('execute for update employe', async () => {
      return request(app.getHttpServer())
        .put('/api/employee')
        .send({
          employee_id: '5dec5770-2d8c-11ec-8d3d-0242ac130003',
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

    it('execute for update employe (failed)', async () => {
      return request(app.getHttpServer())
        .put('/api/employee')
        .then((res: { status: number; body: IDBResponse }) => {
          expect(res.status).toBe(400);
        });
    });
  });
});
