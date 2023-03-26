import express from 'express';

import createUserController from './createUser/createUser.controller';
import deleteUserController from './deleteUser/deleteUser.controller';
import getUserController from './getUser/getUser.controller';
import updateUserController from './updateUser/updateUser.controller';

const userRouter = express.Router();

userRouter.post('/users', createUserController);
userRouter.get('/users/:id', getUserController);
userRouter.put('/users/:id', updateUserController);
userRouter.delete('/users/:id', deleteUserController);

export default userRouter;
