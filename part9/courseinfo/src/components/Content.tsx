import { CoursePart } from '../types';
import Part from './Part';

type ContentProps = {
  parts: CoursePart[];
};

const Content = (props: ContentProps): JSX.Element => {
  return !props.parts.length ? (
    <div>No data</div>
  ) : (
    <div>
      {props.parts.map((p: CoursePart) => (
        <Part key={p.name} part={p} />
      ))}
    </div>
  );
};

export default Content;
