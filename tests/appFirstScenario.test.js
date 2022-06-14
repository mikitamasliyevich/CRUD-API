/* eslint-disable no-undef */
const supertest = require('supertest');
const server = require('../src/server');
const { HTTP_STATUS_CODES } = require('../src/utils/constants');

const request = supertest(server);

const expectedResponse = [];

const TEST_USER_DATA = {
  username: 'Mikita',
  age: 22,
  hobbies: ['tennis', 'boxing'],
};

const TEST_USER_DATA_UPDATE = {
  username: 'Dima',
  age: 21,
  hobbies: ['tennis', 'coding'],
};

describe('Scenario - 1', () => {
  it('GET should receive empty array if first request', async () => {
    await request.get('/api/users')
      .expect(HTTP_STATUS_CODES.OK)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toEqual(expectedResponse);
      });
  });

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

  it('GET should receive object via ID', async () => {
    let userID;
    await request
      .get('/api/users')
      .expect(HTTP_STATUS_CODES.OK)
      .then((response) => {
        userID = response.body.map((element) => element.id);
      });
    await request
      .get(`/api/users/${userID.join()}`)
      .set('Accept', 'application/json')
      .expect(HTTP_STATUS_CODES.OK)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body.id).toEqual(userID.join());
      });
  });

  it('PUT should update object via ID', async () => {
    let userID;
    await request
      .get('/api/users')
      .expect(HTTP_STATUS_CODES.OK)
      .then((response) => {
        userID = response.body.map((element) => element.id);
      });
    await request
      .put(`/api/users/${userID.join()}`)
      .set('Accept', 'application/json')
      .send(TEST_USER_DATA_UPDATE)
      .expect(HTTP_STATUS_CODES.OK)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toMatchObject(TEST_USER_DATA_UPDATE);
      });
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

    await request
      .get(`/api/users/${userID.join()}`)
      .set('Accept', 'application/json')
      .expect(HTTP_STATUS_CODES.NOT_FOUND)
      .expect('Content-Type', /json/);
  });
});
