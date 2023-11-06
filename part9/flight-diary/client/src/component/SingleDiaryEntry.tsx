import { DiaryEntry } from '../types';

interface DiaryProps {
  diaryEntry: DiaryEntry;
}

const SingleDiaryEntry = (props: DiaryProps): JSX.Element => {
  return (
    <div>
      <div>
        <b>{props.diaryEntry.date}</b>
      </div>
      <br />
      <div>visibility: {props.diaryEntry.visibility}</div>
      <div>weather: {props.diaryEntry.weather}</div>
      <br />
    </div>
  );
};

export default SingleDiaryEntry;
