import { Request, Response } from 'express';
import { User } from '../models/user';
import {
  createUser,
  updateUser,
  getUserById,
  getAutoSuggestUsers,
  deleteUser,
} from '../models/user';

export const createUserController = (req: Request, res: Response): void => {
  const user = req.body as User;
  const newUser = createUser(user);
  res.status(201).json(newUser);
};

export const updateUserController = (req: Request, res: Response): void => {
  const { id } = req.params;
  const updatedUser = req.body as User;
  const newUser = updateUser(id, updatedUser);
  if (!newUser) {
    res.status(404).send('User not found');
    return;
  }
  res.json(newUser);
};

export const getUserByIdController = (req: Request, res: Response): void => {
  const { id } = req.params;
  const user = getUserById(id);
  if (!user) {
    res.status(404).send('User not found');
    return;
  }
  res.json(user);
};

export const getAutoSuggestUsersController = (req: Request, res: Response): void => {
  const { loginSubstring, limit } = req.query;
  const users = getAutoSuggestUsers(loginSubstring as string, parseInt(limit as string));
  res.json(users);
};

export const deleteUserController = (req: Request, res: Response): void => {
  const { id } = req.params;
  const deletedUser = deleteUser(id);
  if (!deletedUser) {
    res.status(404).send('User not found');
    return;
  }
  res.json(deletedUser);
};
