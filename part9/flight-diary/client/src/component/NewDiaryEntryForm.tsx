import { useState } from 'react';

import { NewDiaryEntry, Visibility, Weather } from '../types';

interface Props {
  submitNewDiaryEntry: (newDiaryEntry: NewDiaryEntry) => void;
}

const NewDiaryEntryForm = ({ submitNewDiaryEntry }: Props) => {
  const [newDiaryEntry, setNewDiaryEntry] = useState<NewDiaryEntry>(
    {} as NewDiaryEntry
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDiaryEntry({
      ...newDiaryEntry,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const addDiaryEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    submitNewDiaryEntry(newDiaryEntry);
  };

  return (
    <form onSubmit={addDiaryEntry}>
      <div>
        <label htmlFor='newEntry_date'>date </label>
        <input
          type='date'
          name='date'
          id='newEntry_date'
          value={newDiaryEntry.date || ''}
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
          value={newDiaryEntry.comment || ''}
          onChange={handleChange}
        />
      </div>
      <button type='submit'>add</button>
    </form>
  );
};
export default NewDiaryEntryForm;
