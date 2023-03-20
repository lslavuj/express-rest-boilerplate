import express from 'express';

import createPersonController from './createPerson/createPerson.controller';
import deletePersonController from './deletePerson/deletePerson.controller';
import getPersonController from './getPerson/getPerson.controller';
import updatePersonController from './updatePerson/updatePerson.controller';

const router = express.Router();

router.post('/person', createPersonController);
router.get('/person:id', getPersonController);
router.put('/person:id', updatePersonController);
router.delete('/person:id', deletePersonController);

export default router;
