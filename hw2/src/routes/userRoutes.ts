import express from 'express';
import {
  createUserController,
  updateUserController,
  getUserByIdController,
  getAutoSuggestUsersController,
  deleteUserController,
} from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/', createUserController);

userRouter.put('/:id', updateUserController);

userRouter.get('/:id', getUserByIdController);

userRouter.get('/', getAutoSuggestUsersController);

userRouter.delete('/:id', deleteUserController);

export default userRouter;
