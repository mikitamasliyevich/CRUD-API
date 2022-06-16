import * as http from 'http';
import { UUID_REGEX } from './utils/utils';
import { invalidId, serverError, routeError } from './errors/errors';
import {
  getUsers, getUser, deleteUser, createUser, updateUser
} from './controllers/userControllers';

 export const server = http.createServer((req, res) => {
  try {
    if (req.url === '/api/users' && req.method === 'GET') {
      getUsers(req, res);
    } else if (req.url.match(UUID_REGEX) && req.method === 'GET') {
      const id: string = req.url.split('/')[3];
      getUser(req, res, id);
    } else if (req.url === '/api/users' && req.method === 'POST') {
      createUser(req, res);
    } else if (req.url.match(UUID_REGEX) && req.method === 'PUT') {
      const id: string = req.url.split('/')[3];
      updateUser(req, res, id);
    } else if (req.url.match(UUID_REGEX) && req.method === 'DELETE') {
      const id: string = req.url.split('/')[3];
      deleteUser(req, res, id);
    } else if (!req.url.match(UUID_REGEX)) {
      invalidId(req, res);
    } else {
      routeError(req, res);
    }
  } catch {
    serverError(req, res);
  }
});
// module.exports = server
