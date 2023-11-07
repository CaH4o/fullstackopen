import { DiaryEntry } from '../types';

interface DiaryEntriesListProps {
  diaryEntries: DiaryEntry[];
}

const DiaryEntriesList = (props: DiaryEntriesListProps): JSX.Element => {
  return (
    <div>
      {props.diaryEntries.map((diaryEntry: DiaryEntry) => (
        <div key={diaryEntry.id}>
          <div>
            <b>{diaryEntry.date}</b>
          </div>
          <br />
          <div>visibility: {diaryEntry.visibility}</div>
          <div>weather: {diaryEntry.weather}</div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default DiaryEntriesList;
