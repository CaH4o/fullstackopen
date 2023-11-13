import { useState, useEffect } from 'react';
import axios from 'axios';

import { DiaryEntry, NewDiaryEntry } from './types';
import diaryEntryService from './services/diaryEntry';

import DiaryEntriesList from './component/DiaryEntriesList';
import NewDiaryEntryForm from './component/NewDiaryEntryForm';
import Notification from './component/Notification';

const App = (): JSX.Element => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState<string>('');

  useEffect(() => {
    diaryEntryService.getAll().then((data: DiaryEntry[] | Error) => {
      if (data instanceof Error) {
        setNotification(data.message);
      } else {
        setDiaryEntries(data);
      }
    });
  }, []);

  const submitNewDiaryEntry = async (newDiaryEntry: NewDiaryEntry) => {
    try {
      const diaryEntry = await diaryEntryService.create(newDiaryEntry);
      setDiaryEntries(diaryEntries.concat(diaryEntry));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setNotification(message);
        } else {
          console.error('Unrecognized axios error', e);
          setNotification('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setNotification('Unknown error');
      }
    }
  };

  return (
    <div>
      <h4>Add new entry</h4>
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
      <NewDiaryEntryForm submitNewDiaryEntry={submitNewDiaryEntry} />
      <h4>Diary entries</h4>
      <DiaryEntriesList diaryEntries={diaryEntries} />
    </div>
  );
};

export default App;
