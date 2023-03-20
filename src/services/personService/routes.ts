import express from 'express';

import createPersonController from './createPerson/createPerson.controller';
import deletePersonController from './deletePerson/deletePerson.controller';
import getPersonController from './getPerson/getPerson.controller';
import updatePersonController from './updatePerson/updatePerson.controller';

const personRouter = express.Router();

personRouter.post('/person', createPersonController);
personRouter.get('/person:id', getPersonController);
personRouter.put('/person:id', updatePersonController);
personRouter.delete('/person:id', deletePersonController);

export default personRouter;
