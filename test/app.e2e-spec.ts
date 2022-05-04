import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  jest.setTimeout(10000);
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) and return a acces_token', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'teste@dan.com', password: 'teste123' })
      .expect(201)
      .expect((res) => {
        console.log(res.body);
        expect(res.body.access_token).toBeDefined();
      });
  });

  it('/auth/login (POST) and return an error', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'teste11@dan.com', password: 'teste123' })
      .expect(401);
  });
});
