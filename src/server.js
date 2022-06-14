const http = require('http');
const { UUID_REGEX } = require('./utils/utils');
const { invalidId, serverError, routeError } = require('./errors/errors');

const {
  getUsers, getUser, createUser, updateUser, deleteUser,
} = require('./controllers/userControllers');

const server = http.createServer((req, res) => {
  try {
    if (req.url === '/api/users' && req.method === 'GET') {
      getUsers(req, res);
    } else if (req.url.match(UUID_REGEX) && req.method === 'GET') {
      const id = req.url.split('/')[3];
      getUser(req, res, id);
    } else if (req.url === '/api/users' && req.method === 'POST') {
      createUser(req, res);
    } else if (req.url.match(UUID_REGEX) && req.method === 'PUT') {
      const id = req.url.split('/')[3];
      updateUser(req, res, id);
    } else if (req.url.match(UUID_REGEX) && req.method === 'DELETE') {
      const id = req.url.split('/')[3];
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

module.exports = server;
