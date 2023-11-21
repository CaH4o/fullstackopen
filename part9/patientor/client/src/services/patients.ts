import axios from 'axios';

import { Patient, PatientFormValues, EntryWithoutId } from '../types';
import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);
  return data;
};

const createEntry = async (object: { id: string; entry: EntryWithoutId }) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients/${object.id}/entries`,
    object.entry
  );
  return data;
};

export default { getAll, getOne, create, createEntry };
