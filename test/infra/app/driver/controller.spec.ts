import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DriverModule } from 'src/infra/app/driver/module';
import * as request from 'supertest';

describe('DriverController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DriverModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /driver', () => {
    return request(app.getHttpServer())
      .get('/driver')
      .expect(200)
      .expect((response) => expect(response.body).toHaveLength(24));
  });

  describe('GET /driver/:code', () => {
    it('should return 200 statusCode', () => {
      return request(app.getHttpServer())
        .get('/driver/LEC')
        .expect(200)
        .expect({
          code: 'LEC',
          firstName: 'Charles',
          lastName: 'Leclerc',
          dateOfBirth: '1997-10-16',
          nationality: 'Monegasque',
        });
    });

    it('should return 404 statusCode', () => {
      return request(app.getHttpServer())
        .get('/driver/DoesNotExist')
        .expect(404)
        .expect({
          statusCode: 404,
          message: 'Not Found',
        });
    });
  });

  it('POST /driver', () => {
    return request(app.getHttpServer())
      .post('/driver')
      .send({
        code: 'FVI',
        firstName: 'Florian',
        lastName: 'VIAL',
        dateOfBirth: '1995-09-28',
        nationality: 'French',
      })
      .expect(201);
  });
});
