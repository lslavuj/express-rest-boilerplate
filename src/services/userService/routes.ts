import express from 'express';

import changeUserPasswordController from './changeUserPassword/changeUserPassword.controller';
import createUserController from './createUser/createUser.controller';
import deleteUserController from './deleteUser/deleteUser.controller';
import getUserController from './getUser/getUser.controller';
import updateUserController from './updateUser/updateUser.controller';
import authMiddleware from '../../middlewares/authMiddleware';

const userRouter = express.Router();

// users crud
userRouter.post('/users', authMiddleware, createUserController);
userRouter.get('/users/:id', authMiddleware, getUserController);
userRouter.put('/users/:id', authMiddleware, updateUserController);
userRouter.delete('/users/:id', authMiddleware, deleteUserController);

// user password
userRouter.post('/users/change-password', authMiddleware, changeUserPasswordController);

export default userRouter;
