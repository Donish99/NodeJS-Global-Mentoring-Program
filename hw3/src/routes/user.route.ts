import express, { Router } from 'express';
import UsersController from './user.controller';

const router: Router = express.Router();

router.post('/', UsersController.createUser);

router.put('/:id', UsersController.updateUser);

router.get('/:id', UsersController.getUserById);

router.get('/', UsersController.getAutoSuggestUsers);

router.delete('/:id', UsersController.deleteUser);

export default router;