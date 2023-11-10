export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface Patient {
  'id': string;
  'name': string;
  'dateOfBirth': string;
  'ssn': string;
  'gender': Gender;
  'occupation': string;
  'entries': Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type PatientWithoutID = Omit<Patient, 'id' | 'entries'>;

export interface Diagnos {
  'code': string;
  'name': string;
  'latin'?: string;
}
