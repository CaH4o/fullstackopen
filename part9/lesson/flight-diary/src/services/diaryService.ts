//2
//import diaryData from '../../data/entries.json';

//2-3
//import { DiaryEntry } from '../types';

//6
//import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';

//7-1
//import {
//  NonSensitiveDiaryEntry,
//  DiaryEntry,
//  Visibility,
//  Weather,
//} from '../types';

//8
import { NewDiaryEntry, NonSensitiveDiaryEntry, DiaryEntry } from '../types';

//1
//const getEntries = () => {
//  return diaryData;
//};

//2
//const diaries: DiaryEntry[] = diaryData as DiaryEntry[];

//2
//const getEntries = (): Array<DiaryEntry> => {
//  return diaries;
//};

//3
import diaries from '../../data/entries';

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

//4
//const getNonSensitiveEntries =
//  (): Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>[] => {
//  // ...
//}

//5
//const getNonSensitiveEntries = (): Omit<DiaryEntry, 'comment'>[] => {
//  // ...
//}

//6
const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  //return diaries;
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

//6
//const addDiary = () => {
//  return null;
//};

//7-1
//const addDiary = (
//  date: string,
//  weather: Weather,
//  visibility: Visibility,
//  comment: string
//): DiaryEntry => {
//  const newDiaryEntry = {
//    id: Math.max(...diaries.map((d) => d.id)) + 1,
//    date,
//    weather,
//    visibility,
//    comment,
//  };
//
//  diaries.push(newDiaryEntry);
//  return newDiaryEntry;
//};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...entry,
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

//7
const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id);
  return entry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addDiary,
  findById,
};
