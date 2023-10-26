import express from 'express';

import pationtsService from '../services/pationts';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(pationtsService.getWithoutSNN());
});

router.post('/', (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { name, dateOfBirth, gender, occupation, ssn } = req.body;

  const newPatient = pationtsService.postNewPatient({
    name,
    dateOfBirth,
    gender,
    occupation,
    ssn,
  });

  res.json(newPatient);
});

export default router;
