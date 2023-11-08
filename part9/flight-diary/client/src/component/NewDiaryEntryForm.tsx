import { useState } from 'react';

import { DiaryEntry, NewDiaryEntry } from '../types';
import { createDiaryEntry } from '../services/diaryEntryService';

interface NewDiaryEntryFormProps {
  diaryEntries: DiaryEntry[];
  setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  setNotification: React.Dispatch<React.SetStateAction<string>>;
}

const NewDiaryEntryForm = (props: NewDiaryEntryFormProps) => {
  const [newNewDiaryEntry, setNewDiaryEntry] = useState<NewDiaryEntry>(
    {} as NewDiaryEntry
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDiaryEntry({
      ...newNewDiaryEntry,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const diaryEntryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiaryEntry(newNewDiaryEntry).then((data: DiaryEntry | Error) => {
      if (data instanceof Error) {
        props.setNotification(data.message);
      } else {
        props.setDiaryEntries(props.diaryEntries.concat(data));
        setNewDiaryEntry({} as NewDiaryEntry);
      }
    });
  };

  return (
    <form onSubmit={diaryEntryCreation}>
      <div>
        <label htmlFor='newEntry_date'>date </label>
        <input
          name='date'
          id='newEntry_date'
          value={newNewDiaryEntry.date || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor='newEntry_visibility'>visibility </label>
        <input
          name='visibility'
          id='newEntry_visibility'
          value={newNewDiaryEntry.visibility || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor='newEntry_weather'>weather </label>
        <input
          name='weather'
          id='newEntry_weather'
          value={newNewDiaryEntry.weather || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor='newEntry_comment'>comment </label>
        <input
          name='comment'
          id='newEntry_comment'
          value={newNewDiaryEntry.comment || ''}
          onChange={handleChange}
        />
      </div>
      <button type='submit'>add</button>
    </form>
  );
};
export default NewDiaryEntryForm;
