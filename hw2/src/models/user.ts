import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export const users: User[] = [];

console.log(users);


export const createUser = (user: User): User => {
  const newUser = { ...user, id: uuidv4(), isDeleted: false };
  users.push(newUser);
  return newUser;
};

export const updateUser = (id: string, updatedUser: User): User | undefined => {
  const userIndex = users.findIndex(user => user.id === id && !user.isDeleted);
  if (userIndex === -1) return undefined;
  const newUser = { ...users[userIndex], ...updatedUser };
  users[userIndex] = newUser;
  return newUser;
};

export const getUserById = (id: string): User | undefined =>
  users.find(user => user.id === id && !user.isDeleted);

export const getAutoSuggestUsers = (loginSubstring: string, limit: number): User[] =>
  users
    .filter(user => user.login.includes(loginSubstring) && !user.isDeleted)
    .sort((user1, user2) => user1.login.localeCompare(user2.login))
    .slice(0, limit);

export const deleteUser = (id: string): User | undefined => {
  const userIndex = users.findIndex(user => user.id === id && !user.isDeleted);
  if (userIndex === -1) return undefined;
  const deletedUser = { ...users[userIndex], isDeleted: true };
  users[userIndex] = deletedUser;
  return deletedUser;
};
