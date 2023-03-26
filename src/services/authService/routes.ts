import express from 'express';

import loginController from './login/login.controller';

const loginRoutes = express.Router();

loginRoutes.post('/login', loginController);

export default loginRoutes;
