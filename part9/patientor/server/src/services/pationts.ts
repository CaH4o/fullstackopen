import { v1 as uuid } from 'uuid';

import { Patient, PatientWithoutSSN, PatientWithoutID } from '../types';
import patients from '../../data/patients';

const getAll = (): Patient[] => {
  return patients;
};

const getWithoutSNN = (): PatientWithoutSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const postNewPatient = (entry: PatientWithoutID): Patient => {
  const id: string = uuid();
  const newPatient: Patient = { ...entry, id };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getAll,
  getWithoutSNN,
  postNewPatient,
};
