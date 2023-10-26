export type Gender = 'female' | 'male' | 'other';

/* export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
} */

export interface Patient {
  'id': string;
  'name': string;
  'dateOfBirth': string;
  'ssn': string;
  'gender': Gender;
  'occupation': string;
}

export type PatientWithoutSSN = Omit<Patient, 'ssn'>;

export type PatientWithoutID = Omit<Patient, 'id'>;

export interface Diagnos {
  'code': string;
  'name': string;
  'latin'?: string;
}
