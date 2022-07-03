export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATE: 201,
  INTERNAL_SERVER_ERROR: 500,
  NOT_VALID: 400,
  NOT_FOUND: 404,
  DELETE: 204,
};

export const DEFAULT_HEADERS = { 'Content-Type': 'application/json' };

export const createInvalidMessage = (id) => `User with ID='${id}' not found`;
