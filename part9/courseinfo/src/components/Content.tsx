import { CoursePart, CourseParts } from '../types';

type ContentProps = { parts: CourseParts };

const Content = (props: ContentProps) => {
  return (
    <>
      {props.parts.map((p: CoursePart) => (
        <p key={p.name}>
          {p.name} {p.exerciseCount}
        </p>
      ))}
    </>
  );
};
export default Content;
