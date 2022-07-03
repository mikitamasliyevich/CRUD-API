import {findAll, findById, create, update,remove} from '../models/userModel';
import { getPostData } from '../utils/utils';
import { serverError } from '../errors/errors';
import { HTTP_STATUS_CODES, DEFAULT_HEADERS, createInvalidMessage } from '../utils/constants';

interface IUser {
  username: string,
  age: number,
  hobbies: string[],
}

type AllUser = {
  username?: string,
  age?: number,
  hobbies?: string[],
  id?: string
}
/**
   * @desc Returns all users
   * @route GET /api/users
   */
 export async function  getUsers(req, res) {
  try {
    const user = await findAll();
    res.writeHead(HTTP_STATUS_CODES.OK, DEFAULT_HEADERS);
    res.end(JSON.stringify(user));
  } catch (error) {
    serverError(req, res);
  }
}

// /**
//    * @desc Returns one user by id
//    * @route GET /api/users/:id
//    */

export async function getUser(req, res, id) {
  try {
    const user = await findById(id);

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

//    * @desc Creates a user
//    * @route POST /api/users
//    */

export async function createUser(req, res) {
  try {
    const body: unknown = await getPostData(req);
    const { username, age, hobbies } = JSON.parse(body as string);

    const user: IUser = {
      username,
      age,
      hobbies,
    };

    if (!Object.values(user).includes(undefined)) {
      const newUser = await create(user);
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

export async function updateUser(req, res, id: string) {
  try {
    const user: AllUser = await findById(id);
    if (!user) {
      res.writeHead(HTTP_STATUS_CODES.NOT_FOUND, DEFAULT_HEADERS);
      res.end(JSON.stringify({ message: createInvalidMessage(id) }));
    } else {
      const body: unknown = await getPostData(req);
      const { username, age, hobbies } = JSON.parse(body as string);

      const userData: IUser = {
        username: username || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies,
      };

      const updUser = await update(id, userData);

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

export async function deleteUser(req, res, id) {
  try {
    const user = await findById(id);

    if (!user) {
      res.writeHead(HTTP_STATUS_CODES.NOT_FOUND, DEFAULT_HEADERS);
      res.end(JSON.stringify({ message: createInvalidMessage(id) }));
    } else {
      await remove(id);
      res.writeHead(HTTP_STATUS_CODES.DELETE, DEFAULT_HEADERS);
      res.end(JSON.stringify({ message: `User ${id} removed` }));
    }
  } catch (error) {
    serverError(req, res);
  }
}