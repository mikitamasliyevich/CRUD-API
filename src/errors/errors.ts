import { HTTP_STATUS_CODES, DEFAULT_HEADERS } from '../utils/constants';

export function invalidId(req, res) {
  res.writeHead(HTTP_STATUS_CODES.NOT_VALID, DEFAULT_HEADERS);
  res.end(JSON.stringify({ message: 'Invalid ID user' }));
}

export function serverError(req, res) {
  res.writeHead(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, DEFAULT_HEADERS);
  res.end(JSON.stringify({ message: '500 Internal Server Error' }));
}

export function routeError(req, res) {
  res.writeHead(HTTP_STATUS_CODES.NOT_FOUND, DEFAULT_HEADERS);
  res.end(JSON.stringify({ message: 'Route not found' }));
}
