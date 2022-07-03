import { v4 as uuidv4 } from 'uuid';
let users = require('../../data/users.json');
import { writeDataToFile } from '../utils/utils';

export function findAll() {
  return new Promise((resolve) => {
    resolve(users);
  });
}

export function findById(id) {
  return new Promise((resolve) => {
    const user = users.find((p) => p.id === id);
    resolve(user);
  });
}

export function create(user) {
  return new Promise((resolve) => {
    const newUser = { id: uuidv4(), ...user };
    users.push(newUser);
    writeDataToFile('././data/users.json', users);
    resolve(newUser);
  });
}

export function update(id, user) {
  return new Promise((resolve) => {
    const index = users.findIndex((p) => p.id === id);
    users[index] = { id, ...user };
    writeDataToFile('././data/users.json', users);
    resolve(users[index]);
  });
}

export function remove(id) {
  return new Promise<void>((resolve) => {
    users = users.filter((p) => p.id !== id);
    writeDataToFile('././data/users.json', users);
    resolve();
  });
}
