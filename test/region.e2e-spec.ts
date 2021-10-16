import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { RegionController } from './../src/controllers/region.controller';
import { RegionModule } from './../src/service/region/region.module';
import { RegionService } from './../src/service/region/region.service';
import { DATABASE_CONNECTION, REGION_REPOSITORY } from './../src/constants';
import { IDBResponse } from './../interfaces/db.response.interface';
import { IResponseRegion } from './../interfaces/region.response.interface';
import { responseGetRegion } from './mock/mock.response.get.region';
import { responseDB } from './mock/mock.response.db';

describe('RegionController', () => {
  let app: INestApplication;
  const regionService = {
    setRegion: () => Promise.resolve(responseDB),
    getRegionById: () => Promise.resolve(responseGetRegion)
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [RegionModule],
      controllers: [RegionController]
    })
      .overrideProvider(DATABASE_CONNECTION)
      .useValue({})
      .overrideProvider(REGION_REPOSITORY)
      .useValue({})
      .overrideProvider(RegionService)
      .useValue(regionService)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /region', () => {
    it('execute for get region by id', async () => {
      return request(app.getHttpServer())
        .get('/api/region?id=1')
        .then((res: { status: number; body: IResponseRegion }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseGetRegion);
        });
    });
  });

  describe('SET /region', () => {
    it('execute for set region', async () => {
      return request(app.getHttpServer())
        .post('/api/region')
        .send({
          title: 'TEST'
        })
        .then((res: { status: number; body: IDBResponse }) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(responseDB);
        });
    });

    it('execute for set region (failed)', async () => {
      return request(app.getHttpServer())
        .post('/api/region')
        .then((res: { status: number; body: IDBResponse }) => {
          expect(res.status).toBe(400);
        });
    });
  });
});
