/* eslint-disable no-undef */
const supertest = require('supertest');
import {server} from '../src/server';
import {HTTP_STATUS_CODES} from '../src/utils/constants';

const request = supertest(server);

const TEST_USER_DATA = {
  username: 'Mikita',
  age: 22,
  hobbies: ['tennis', 'boxing'],
};

const TEST_USER_INVALID_DATA = {
  username: 'Mikita',
  hobbies: ['tennis', 'boxing'],
};

const expectedResponse = [];

describe('Scenario - 2', () => {
  it('POST create a new object', async () => {
    await request
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(TEST_USER_DATA)
      .expect('Content-Type', /json/)
      .expect(HTTP_STATUS_CODES.CREATE)
      .then((response) => {
        expect(response.body).toMatchObject(TEST_USER_DATA);
      });
  });

  it('GET should not receive object via Invalid ID', async () => {
    const invalidID = 'cfd38734-4aca-4654-97f3-6bc59';
    await request
      .get(`/api/users/${invalidID}`)
      .set('Accept', 'application/json')
      .expect(HTTP_STATUS_CODES.NOT_VALID)
      .expect('Content-Type', /json/);
  });

  it('GET should receive object via non-existent ID', async () => {
    const invalidID = 'ccca0c3c-5353-42d4-91c9-33427eff1c6c';
    await request
      .get(`/api/users/${invalidID}`)
      .set('Accept', 'application/json')
      .expect(HTTP_STATUS_CODES.NOT_FOUND)
      .expect('Content-Type', /json/);
  });

  it('POST create a new object which does not contain required property age', async () => {
    await request
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(TEST_USER_INVALID_DATA)
      .expect('Content-Type', /json/)
      .expect(HTTP_STATUS_CODES.NOT_VALID);
  });

  it('DELETE object via ID and try to receive one via deleted ID', async () => {
    let userID;
    await request
      .get('/api/users')
      .expect(HTTP_STATUS_CODES.OK)
      .then((response) => {
        userID = response.body.map((element) => element.id);
      });

    await request
      .delete(`/api/users/${userID.join()}`)
      .set('Accept', 'application/json')
      .expect(HTTP_STATUS_CODES.DELETE)
      .expect('Content-Type', /json/);
  });

  it('GET should receive empty array if first request', async () => {
    await request.get('/api/users')
      .expect(HTTP_STATUS_CODES.OK)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toEqual(expectedResponse);
      });
  });
});
