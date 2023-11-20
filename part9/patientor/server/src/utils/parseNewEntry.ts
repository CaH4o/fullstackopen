import { Diagnosis, EntryWithoutId, HealthCheckRating } from '../types';
import {
  isArrayOfString,
  isDate,
  isHealthCheckRating,
  isNumber,
  isString,
  isType,
} from './typeValidation';

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist) || specialist.split(' ').length < 2) {
    throw new Error(
      'Incorrect (e.g not full name) or missing specialist ' + specialist
    );
  }
  return specialist;
};

const parseType = (type: unknown): string => {
  if (!isString(type) || !isType(type)) {
    throw new Error('Incorrect or missing type: ' + type);
  }
  return type;
};

const parseDiagnosisCodes = (diagnosis: unknown): Array<Diagnosis['code']> => {
  console.log(diagnosis);
  if (!isArrayOfString(diagnosis)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }
  return diagnosis;
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(
      'Incorrect or missing health check rating: ' + healthCheckRating
    );
  }
  return healthCheckRating;
};

const parseDischarge = (
  object: unknown
): { date: string; criteria: string } => {
  if (
    !object ||
    typeof object !== 'object' ||
    !('date' in object) ||
    !('criteria' in object)
  ) {
    throw new Error('Incorrect or missing discharge');
  }

  if (!isString(object.date) || !isDate(object.date)) {
    throw new Error('Incorrect or missing date: ' + object.date);
  }

  if (!isString(object.criteria)) {
    throw new Error('Incorrect or missing criteria');
  }

  return object as { date: string; criteria: string };
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error(
      'Incorrect (e.g not full name) or missing specialist ' + employerName
    );
  }
  return employerName;
};

const parseSickLeave = (
  object: unknown
): { startDate: string; endDate: string } => {
  if (
    !object ||
    typeof object !== 'object' ||
    !('startDate' in object) ||
    !('endDate' in object)
  ) {
    throw new Error('Incorrect or missing sickLeave');
  }

  if (!isString(object.startDate) || !isDate(object.startDate)) {
    throw new Error('Incorrect or missing date: ' + object.startDate);
  }

  if (!isString(object.endDate) || !isDate(object.endDate)) {
    throw new Error('Incorrect or missing date: ' + object.endDate);
  }

  return object as { startDate: string; endDate: string };
};

const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    !(
      'description' in object &&
      'date' in object &&
      'specialist' in object &&
      'type' in object
    )
  ) {
    throw new Error('Incorrect data: some fields are missing');
  }

  const description = parseDescription(object.description);
  const date = parseDate(object.date);
  const specialist = parseSpecialist(object.specialist);
  const type = parseType(object.type);

  const newEntry = { description, date, specialist, type } as EntryWithoutId;

  if ('diagnosisCodes' in object) {
    const diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
    newEntry['diagnosisCodes'] = diagnosisCodes;
  }

  switch (newEntry.type) {
    case 'HealthCheck':
      if (!('healthCheckRating' in object)) {
        throw new Error('Incorrect data: some fields are missing');
      }
      const healthCheckRating = parseHealthCheckRating(
        object.healthCheckRating
      );
      newEntry['healthCheckRating'] = healthCheckRating;
      return newEntry;
    case 'Hospital':
      if (!('discharge' in object)) {
        throw new Error('Incorrect data: some fields are missing');
      }
      const discharge = parseDischarge(object.discharge);
      newEntry['discharge'] = discharge;
      return newEntry;
    case 'OccupationalHealthcare':
      if (!('employerName' in object)) {
        throw new Error('Incorrect data: some fields are missing');
      }
      const employerName = parseEmployerName(object.employerName);
      newEntry['employerName'] = employerName;

      if ('sickLeave' in object) {
        const sickLeave = parseSickLeave(object.sickLeave);
        newEntry['sickLeave'] = sickLeave;
      }

      return newEntry;
    default:
      throw new Error('Incorrect data: some fields are missing');
  }
};

export default toNewEntry;
