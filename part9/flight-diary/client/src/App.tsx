import { useState, useEffect } from 'react';

import { DiaryEntry } from './types';
import { getAllDiaryEntries } from './services/diaryEntryService';
import DiaryEntriesList from './component/DiaryEntriesList';
import NewDiaryEntryForm from './component/NewDiaryEntryForm';
import Notification from './component/Notification';

const App = (): JSX.Element => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState<string>('');

  useEffect(() => {
    getAllDiaryEntries().then((data: DiaryEntry[] | Error) => {
      if (data instanceof Error) {
        setNotification(data.message);
      } else {
        setDiaryEntries(data);
      }
    });
  }, []);

  return (
    <div>
      <h4>Add new entry</h4>
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
      <NewDiaryEntryForm
        diaryEntries={diaryEntries}
        setDiaryEntries={setDiaryEntries}
        setNotification={setNotification}
      />
      <h4>Diary entries</h4>
      <DiaryEntriesList diaryEntries={diaryEntries} />
    </div>
  );
};

export default App;
