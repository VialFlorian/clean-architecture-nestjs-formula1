import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/infra/app/app.module';
import { DURATION } from 'src/infra/app/http.helper';
import * as request from 'supertest';

describe('DriverController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule.forRoot({ repository: 'inmemory' })],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /driver', () => {
    return request(app.getHttpServer())
      .get('/driver')
      .expect(200)
      .expect((response) => expect(response.header['cache-control']).toEqual(`max-age=${DURATION.ONE_HOUR}`))
      .expect((response) => expect(response.body).toHaveLength(24));
  });

  describe('GET /driver/:code', () => {
    it('should return 200 statusCode', () => {
      return request(app.getHttpServer())
        .get('/driver/LEC')
        .expect(200)
        .expect((response) => expect(response.header['cache-control']).toEqual(`max-age=${DURATION.ONE_HOUR}`))
        .expect({
          code: 'LEC',
          firstName: 'Charles',
          lastName: 'Leclerc',
          dateOfBirth: '1997-10-16',
          nationality: 'Monegasque',
        });
    });

    it('should return 404 statusCode', () => {
      return request(app.getHttpServer()).get('/driver/DoesNotExist').expect(404).expect({
        statusCode: 404,
        message: 'Not Found',
      });
    });
  });

  describe('POST /driver', () => {
    const setup = () => {
      const valid = {
        code: 'FVI',
        firstName: 'Florian',
        lastName: 'VIAL',
        dateOfBirth: '1995-09-28',
        nationality: 'French',
      };

      const alreadyExists = {
        code: 'LEC',
        firstName: 'Charles',
        lastName: 'Leclerc',
        dateOfBirth: '1997-10-16',
        nationality: 'Monegasque',
      };

      const withUnknownProp = { ...valid, unknown: 'unknown' };
      const { code, ...withMissingPropCode } = valid; // eslint-disable-line

      return { input: { valid, withMissingPropCode, withUnknownProp, alreadyExists } };
    };

    it('should return 201 statusCode', () => {
      const { input } = setup();
      return request(app.getHttpServer())
        .post('/driver')
        .set('Authorization', 'Bearer b3ZJ24IUFuoGUP')
        .send(input.valid)
        .expect(201);
    });

    it.each([
      [setup().input.withUnknownProp, "Unrecognized key(s) in object: 'unknown'"],
      [setup().input.withMissingPropCode, 'Required (code)'],
    ])('should return 400 statusCode', (input, error) => {
      return request(app.getHttpServer())
        .post('/driver')
        .set('Authorization', 'Bearer b3ZJ24IUFuoGUP')
        .send(input)
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error,
        });
    });

    it('should return 409 statusCode', () => {
      const { input } = setup();
      return request(app.getHttpServer())
        .post('/driver')
        .set('Authorization', 'Bearer b3ZJ24IUFuoGUP')
        .send(input.alreadyExists)
        .expect(409)
        .expect({
          statusCode: 409,
          message: 'Already Exists',
        });
    });
  });
});
