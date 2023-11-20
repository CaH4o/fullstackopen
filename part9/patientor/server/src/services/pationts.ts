import { v1 as uuid } from 'uuid';

import {
  Patient,
  NonSensitivePatient,
  PatientWithoutID,
  EntryWithoutId,
} from '../types';
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

const addNewPatient = (entry: PatientWithoutID): Patient => {
  const id: string = uuid();
  const newPatient: Patient = { ...entry, id, entries: [] };

  patients.push(newPatient);
  return newPatient;
};

const addNewPatientEntry = (
  patient: Patient,
  entry: EntryWithoutId
): Patient => {
  const id: string = uuid();
  const updatedPatient = patients.find((p: Patient) => p.id === patient.id)!;
  patient.entries.push({ ...entry, id });
  return updatedPatient;
};

export default {
  getAll,
  getNonSensitive,
  getOneById,
  addNewPatient,
  addNewPatientEntry,
};
