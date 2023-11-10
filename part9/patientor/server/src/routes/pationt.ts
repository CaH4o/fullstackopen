import express from 'express';

import pationtsService from '../services/pationts';
import toNewPatient from '../utils/parseNewPatient';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(pationtsService.getNonSensitive());
});

router.get('/:id', (req, res) => {
  const patient = pationtsService.getOneById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send({ error: 'not found' });
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = pationtsService.postNewPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
