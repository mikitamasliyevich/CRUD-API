const User = require('../models/userModel');
const { getPostData } = require('../utils/utils');
const { serverError } = require('../errors/errors');
const { HTTP_STATUS_CODES, DEFAULT_HEADERS, createInvalidMessage } = require('../utils/constants');

/**
   * @desc Returns all users
   * @route GET /api/users
   */
async function getUsers(req, res) {
  try {
    const user = await User.findAll();
    res.writeHead(HTTP_STATUS_CODES.OK, DEFAULT_HEADERS);
    res.end(JSON.stringify(user));
  } catch (error) {
    serverError(req, res);
  }
}

/**
   * @desc Returns one user by id
   * @route GET /api/users/:id
   */

async function getUser(req, res, id) {
  try {
    const user = await User.findById(id);

    if (!user) {
      res.writeHead(HTTP_STATUS_CODES.NOT_FOUND, DEFAULT_HEADERS);
      res.end(JSON.stringify({ message: createInvalidMessage(id) }));
    } else {
      res.writeHead(HTTP_STATUS_CODES.OK, DEFAULT_HEADERS);
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    serverError(req, res);
  }
}

/**
   * @desc Creates a user
   * @route POST /api/users
   */

async function createUser(req, res) {
  try {
    const body = await getPostData(req);
    const { username, age, hobbies } = JSON.parse(body);

    const user = {
      username,
      age,
      hobbies,
    };

    if (!Object.values(user).includes(undefined)) {
      const newUser = await User.create(user);
      res.writeHead(HTTP_STATUS_CODES.CREATE, DEFAULT_HEADERS);
      res.end(JSON.stringify(newUser));
    } else {
      res.writeHead(HTTP_STATUS_CODES.NOT_VALID, DEFAULT_HEADERS);
      res.end(JSON.stringify({ message: 'The body does not contain required properties' }));
    }
  } catch (error) {
    serverError(req, res);
  }
}

/**
   * @desc Updates a user
   * @route PUT /api/users/:id
   */

async function updateUser(req, res, id) {
  try {
    const user = await User.findById(id);

    if (!user) {
      res.writeHead(HTTP_STATUS_CODES.NOT_FOUND, DEFAULT_HEADERS);
      res.end(JSON.stringify({ message: createInvalidMessage(id) }));
    } else {
      const body = await getPostData(req);

      const { username, age, hobbies } = JSON.parse(body);

      const userData = {
        username: username || user.username,
        age: age || user.age,
        hobbies: hobbies || user.price,
      };

      const updUser = await User.update(id, userData);

      res.writeHead(HTTP_STATUS_CODES.OK, DEFAULT_HEADERS);
      res.end(JSON.stringify(updUser));
    }
  } catch (error) {
    serverError(req, res);
  }
}

/**
   * @desc Deletes one user by id
   * @route DELETE /api/users/:id
   */

async function deleteUser(req, res, id) {
  try {
    const user = await User.findById(id);

    if (!user) {
      res.writeHead(HTTP_STATUS_CODES.NOT_FOUND, DEFAULT_HEADERS);
      res.end(JSON.stringify({ message: createInvalidMessage(id) }));
    } else {
      await User.remove(id);
      res.writeHead(HTTP_STATUS_CODES.DELETE, DEFAULT_HEADERS);
      res.end(JSON.stringify({ message: `User ${id} removed` }));
    }
  } catch (error) {
    serverError(req, res);
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
