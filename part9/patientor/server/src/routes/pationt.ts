import express from 'express';

import pationtsService from '../services/pationts';
import toNewPatient from '../utils/parseNewPatient';
import toNewEntry from '../utils/parseNewEntry';
import middleware from '../utils/middleware';
import { Patient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(pationtsService.getNonSensitive());
});

router.get('/:id', middleware.getPatient, (req, res) => {
  res.send(req.body.patient);
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = pationtsService.addNewPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', middleware.getPatient, (req, res) => {
  const patient = req.body.patient as Patient;
  try {
    const newEntry = toNewEntry(req.body);
    const updatedPatient = pationtsService.addNewPatientEntry(
      patient,
      newEntry
    );
    res.json(updatedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
