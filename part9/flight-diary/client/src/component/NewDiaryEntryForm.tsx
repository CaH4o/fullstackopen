import { useState } from 'react';

import { DiaryEntry, NewDiaryEntry } from '../types';
import { createDiaryEntry } from '../services/diaryEntryService';

interface NewDiaryEntryFormProps {
  diaryEntries: DiaryEntry[];
  setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}

const NewDiaryEntryForm = (props: NewDiaryEntryFormProps) => {
  const [newNewDiaryEntry, setNewDiaryEntry] = useState<NewDiaryEntry>(
    {} as NewDiaryEntry
  );

  const handleChanger = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDiaryEntry({
      ...newNewDiaryEntry,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const diaryEntryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log('sent', newNewDiaryEntry);

    createDiaryEntry(newNewDiaryEntry).then((data: DiaryEntry) => {
      props.setDiaryEntries(props.diaryEntries.concat(data));
    });
    setNewDiaryEntry({} as NewDiaryEntry);
  };

  console.log('channge', newNewDiaryEntry);

  return (
    <form onSubmit={diaryEntryCreation}>
      <div>
        <label htmlFor='newEntry_date'>date </label>
        <input
          name='date'
          id='newEntry_date'
          value={newNewDiaryEntry.date}
          onChange={(event) => handleChanger(event)}
        />
      </div>
      <div>
        <label htmlFor='newEntry_visibility'>visibility </label>
        <input
          name='visibility'
          id='newEntry_visibility'
          value={newNewDiaryEntry.visibility}
          onChange={(event) => handleChanger(event)}
        />
      </div>
      <div>
        <label htmlFor='newEntry_weather'>weather </label>
        <input
          name='weather'
          id='newEntry_weather'
          value={newNewDiaryEntry.weather}
          onChange={(event) => handleChanger(event)}
        />
      </div>
      <div>
        <label htmlFor='newEntry_comment'>comment </label>
        <input
          name='comment'
          id='newEntry_comment'
          value={newNewDiaryEntry.comment}
          onChange={(event) => handleChanger(event)}
        />
      </div>
      <button type='submit'>add</button>
    </form>
  );
};
export default NewDiaryEntryForm;
