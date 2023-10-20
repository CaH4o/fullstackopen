//2
//import diaryData from '../../data/entries.json';

//2-3
//import { DiaryEntry } from '../types';

//6
import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';

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

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addDiary,
};
