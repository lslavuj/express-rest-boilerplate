import express from 'express';

import loginController from './login/login.controller';
import logoutFromOneDeviceController from './logout/oneDevice/logoutFromOneDevice.controller';
import authMiddleware from '../../middlewares/authMiddleware';

const loginRoutes = express.Router();

// login
loginRoutes.post('/login', loginController);

// logout
loginRoutes.post('/logout', authMiddleware, logoutFromOneDeviceController);

export default loginRoutes;
