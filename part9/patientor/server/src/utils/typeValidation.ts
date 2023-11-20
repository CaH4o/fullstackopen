import { Gender, HealthCheckRating } from '../types';

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const isArrayOfString = (value: unknown): value is string[] => {
  return Array.isArray(value) && value.every((item) => isString(item));
};

export const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

export const isType = (param: string): boolean => {
  return ['HealthCheck', 'Hospital', 'OccupationalHealthcare'].includes(param);
};

export const isHealthCheckRating = (
  param: number
): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};
