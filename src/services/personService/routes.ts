import express from 'express';

import createPersonController from './createPerson/createPerson.controller';
import deletePersonController from './deletePerson/deletePerson.controller';
import getPersonController from './getPerson/getPerson.controller';
import updatePersonController from './updatePerson/updatePerson.controller';

const personRouter = express.Router();

personRouter.post('/persons', createPersonController);
personRouter.get('/persons:id', getPersonController);
personRouter.put('/persons:id', updatePersonController);
personRouter.delete('/persons:id', deletePersonController);

export default personRouter;
