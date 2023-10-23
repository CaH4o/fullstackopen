import { Patient, PatientWithoutSSN } from '../types';
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

export default {
  getAll,
  getWithoutSNN,
};
