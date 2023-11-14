import { v1 as uuid } from 'uuid';

import { Patient, NonSensitivePatient, PatientWithoutID } from '../types';
import patients from '../../data/patients-full';

const getAll = (): Patient[] => {
  return patients;
};

const getNonSensitive = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getOneById = (id: string): Patient | undefined => {
  return patients.find((patient: Patient) => patient.id === id);
};

const postNewPatient = (entry: PatientWithoutID): Patient => {
  const id: string = uuid();
  const newPatient: Patient = { ...entry, id, entries: [] };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getAll,
  getNonSensitive,
  getOneById,
  postNewPatient,
};
