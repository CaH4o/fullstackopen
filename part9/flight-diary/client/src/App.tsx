import { useState, useEffect } from 'react';

import { DiaryEntry } from './types';
import { getAllDiaryEntries } from './services/diaryEntryService';
import DiaryEntriesList from './component/DiaryEntriesList';
import NewDiaryEntryForm from './component/NewDiaryEntryForm';

const App = (): JSX.Element => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaryEntries().then((data) => {
      setDiaryEntries(data);
    });
  }, []);

  return (
    <div>
      <h4>Add new entry</h4>
      <NewDiaryEntryForm
        diaryEntries={diaryEntries}
        setDiaryEntries={setDiaryEntries}
      />
      <h4>Diary entries</h4>
      <DiaryEntriesList diaryEntries={diaryEntries} />
    </div>
  );
};

export default App;
