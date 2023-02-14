import express from 'express';

import createTestController from './createTest/createTest.controller';
import deleteTestController from './deleteTest/deleteTest.controller';
import getTestController from './getTest/getTest.controller';
import updateTestController from './updateTest/updateTest.controller';

const router = express.Router();

router.post('/test', createTestController);
router.get('/test:id', getTestController);
router.put('/test:id', updateTestController);
router.delete('/test:id', deleteTestController);

export default router;
