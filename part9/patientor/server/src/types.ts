export type Gender = 'female' | 'male' | 'other';

export interface Patient {
  'id': string;
  'name': string;
  'dateOfBirth': string;
  'ssn': string;
  'gender': Gender;
  'occupation': string;
}

export interface Diagnos {
  'code': string;
  'name': string;
  'latin'?: string;
}
