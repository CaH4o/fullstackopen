import { Diagnosis } from '../types';
import diagnoses from '../../data/diagnoses';

const get = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  get,
};
