import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { CityController } from './../src/controllers/city.controller';
import { CityModule } from './../src/service/city/city.module';
import { CityService } from './../src/service/city/city.service';
import { DATABASE_CONNECTION, CITY_REPOSITORY, REGION_REPOSITORY } from './../src/constants';
import { IDBResponse } from './../interfaces/db.response.interface';
import { IResponseCity } from './../interfaces/city.response.interface';
import { responseGetCity } from './mock/mock.response.get.city';
import { responseDB } from './mock/mock.response.db';

describe('CityController', () => {
  let app: INestApplication;
  const cityService = {
    setCity: () => Promise.resolve(responseDB),
    getCity: () => Promise.resolve(responseGetCity)
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [CityModule],
      controllers: [CityController]
    })
      .overrideProvider(DATABASE_CONNECTION)
      .useValue({})
      .overrideProvider(CITY_REPOSITORY)
      .useValue({})
      .overrideProvider(REGION_REPOSITORY)
      .useValue({})
      .overrideProvider(CityService)
      .useValue(cityService)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /city', () => {
    it('execute for get city', async () => {
      return request(app.getHttpServer())
        .get('/api/city?id=1')
        .then((res: { status: number; body: IResponseCity }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseGetCity);
        });
    });
  });

  describe('SET /city', () => {
    it('execute for set city', async () => {
      return request(app.getHttpServer())
        .post('/api/city')
        .send({
          title: 'TEST_CITY',
          region: 1
        })
        .then((res: { status: number; body: IDBResponse }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseDB);
        });
    });

    it('execute for set city (failed)', async () => {
      return request(app.getHttpServer())
        .post('/api/city')
        .then((res: { status: number; body: IDBResponse }) => {
          expect(res.status).toBe(400);
        });
    });
  });
});
