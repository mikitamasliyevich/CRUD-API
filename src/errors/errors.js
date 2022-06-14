const { HTTP_STATUS_CODES, DEFAULT_HEADERS } = require('../utils/constants');

function invalidId(req, res) {
  res.writeHead(HTTP_STATUS_CODES.NOT_VALID, DEFAULT_HEADERS);
  res.end(JSON.stringify({ message: 'Invalid ID user' }));
}

function serverError(req, res) {
  res.writeHead(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, DEFAULT_HEADERS);
  res.end(JSON.stringify({ message: '500 Internal Server Error' }));
}

function routeError(req, res) {
  res.writeHead(HTTP_STATUS_CODES.NOT_FOUND, DEFAULT_HEADERS);
  res.end(JSON.stringify({ message: 'Route not found' }));
}

module.exports = {
  invalidId, serverError, routeError,
};
