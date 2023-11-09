import { useState } from 'react';

import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from '../types';
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

  console.log(newNewDiaryEntry);

  return (
    <form onSubmit={diaryEntryCreation}>
      <div>
        <label htmlFor='newEntry_date'>date </label>
        <input
          type='date'
          name='date'
          id='newEntry_date'
          value={newNewDiaryEntry.date || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <span>visibility: </span>
        {Object.entries(Visibility).map(([key, value]) => {
          return (
            <span key={value}>
              <input
                type='radio'
                id={`newEntry_visibility_${value}`}
                name='visibility'
                value={value}
                onChange={handleChange}
              />
              <label htmlFor={`newEntry_visibility_${value}`}>{key}</label>
            </span>
          );
        })}
      </div>
      <div>
        <span>weather: </span>
        {Object.entries(Weather).map(([key, value]) => {
          return (
            <span key={value}>
              <input
                type='radio'
                id={`newEntry_weather_${value}`}
                name='weather'
                value={value}
                onChange={handleChange}
              />
              <label htmlFor={`newEntry_weather_${value}`}>{key}</label>
            </span>
          );
        })}
      </div>
      <div>
        <label htmlFor='newEntry_comment'>comment </label>
        <input
          type='text'
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
