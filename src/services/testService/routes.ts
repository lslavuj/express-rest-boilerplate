import express from 'express';

import createTestController from './createTest/createTest.controller';
import deleteTestController from './deleteTest/deleteTest.constroller';
import getTestController from './getTest/getTest.constroller';
import updateTestController from './updateTest/updateTest.constroller';

const router = express.Router();

router.post('/test', createTestController);
router.get('/test', getTestController);
router.put('/test', updateTestController);
router.delete('/test', deleteTestController);

export default router;
