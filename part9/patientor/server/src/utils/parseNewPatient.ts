import { PatientWithoutID, Gender } from '../types';
import { isString, isDate, isGender } from './typeValidation';

const parseName = (name: unknown): string => {
  if (!isString(name) || name.split(' ').length < 2) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
  const regex = /^\w{6}-\w{3,4}$/;
  if (!isString(ssn) || !regex.test(ssn)) {
    throw new Error('Incorrect or missing snn');
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing weather: ' + gender);
  }
  return gender;
};

const parseOcupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const toNewPatient = (object: unknown): PatientWithoutID => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newEntry: PatientWithoutID = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOcupation(object.occupation),
    };
    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;
