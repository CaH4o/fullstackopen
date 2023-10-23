import { Diagnos } from '../types';
import diagnoses from '../../data/diagnoses';

const get = (): Diagnos[] => {
  return diagnoses;
};

export default {
  get,
};
