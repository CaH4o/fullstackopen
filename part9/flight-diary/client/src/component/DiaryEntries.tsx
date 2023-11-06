import { useState, useEffect } from 'react';

import { DiaryEntry } from '../types';
import { getAllDiaryEntries } from '../services/diaryEntryService';
import SingleDiaryEntry from './SingleDiaryEntry';

const DiaryEntries = (): JSX.Element => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaryEntries().then((data) => {
      setDiaryEntries(data);
    });
  }, []);

  return (
    <div>
      <h4>Diary entries</h4>

      {diaryEntries.map((diaryEntry: DiaryEntry) => (
        <SingleDiaryEntry key={diaryEntry.id} diaryEntry={diaryEntry} />
      ))}
    </div>
  );
};
export default DiaryEntries;
