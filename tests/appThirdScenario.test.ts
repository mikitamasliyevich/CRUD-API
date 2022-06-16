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

const TEST_USER_DATA_UPDATE = {
  username: 'Dima',
  age: 21,
  hobbies: ['tennis', 'coding'],
};

describe('Scenario - 3', () => {
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

  it('PUT should not update object via Invalid ID', async () => {
    const invalidID = 'cfd38734-4aca-4654-97f3-6bc59';
    await request
      .put(`/api/users/${invalidID}`)
      .set('Accept', 'application/json')
      .send(TEST_USER_DATA_UPDATE)
      .expect(HTTP_STATUS_CODES.NOT_VALID)
      .expect('Content-Type', /json/);
  });

  it('PUT should not update object via non-existent ID', async () => {
    const notRealID = 'f5bbba6a-c274-484f-836b-149b05e4d7a4';
    await request
      .put(`/api/users/${notRealID}`)
      .set('Accept', 'application/json')
      .send(TEST_USER_DATA_UPDATE)
      .expect(HTTP_STATUS_CODES.NOT_FOUND)
      .expect('Content-Type', /json/);
  });

  it('Not able to DELETE object via Invalid ID', async () => {
    const invalidID = 'cfd38734-4aca-4654-97f3-6bc59';
    await request
      .delete(`/api/users/${invalidID}`)
      .set('Accept', 'application/json')
      .expect(HTTP_STATUS_CODES.NOT_VALID)
      .expect('Content-Type', /json/);
  });

  it('DELETE object via ID and DELETE with the same ID with error', async () => {
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
      .delete(`/api/users/${userID.join()}`)
      .set('Accept', 'application/json')
      .expect(HTTP_STATUS_CODES.NOT_FOUND)
      .expect('Content-Type', /json/);
  });
});
