import axios from 'axios';

import { DiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaryEntries = async () => {
  try {
    const response = await axios.get<DiaryEntry[]>(baseUrl);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<string>(error)) {
      return new Error(error.message || error.response?.data);
    } else {
      console.error(error);
      return new Error('Unexpected error');
    }
  }
};

export const createDiaryEntry = async (object: NewDiaryEntry) => {
  try {
    const response = await axios.post<DiaryEntry>(baseUrl, object);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<string>(error)) {
      return new Error(error.response?.data || error.message);
    } else {
      console.error(error);
      return new Error('Unexpected error');
    }
  }
};
