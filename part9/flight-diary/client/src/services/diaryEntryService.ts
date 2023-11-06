import axios from 'axios';

import { DiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaryEntries = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data);
};
