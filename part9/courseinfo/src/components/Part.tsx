import { CoursePart } from '../types';
import { assertNever } from '../utils';

interface PartProps {
  part: CoursePart;
}

const Part = (props: PartProps): JSX.Element => {
  switch (props.part.kind) {
    case 'basic':
      return (
        <div>
          <div>
            <b>
              {props.part.name} {props.part.exerciseCount}
            </b>
          </div>
          <div>
            <i>{props.part.description}</i>
          </div>
          <br />
        </div>
      );
    case 'group':
      return (
        <div>
          <div>
            <b>
              {props.part.name} {props.part.exerciseCount}
            </b>
          </div>
          <div>
            <span>project exercises </span>
            {props.part.groupProjectCount}
          </div>
          <br />
        </div>
      );
    case 'background':
      return (
        <div>
          <div>
            <b>
              {props.part.name} {props.part.exerciseCount}
            </b>
          </div>
          <div>
            <i>{props.part.description}</i>
          </div>
          <div>
            <span>submit to </span>
            {props.part.backgroundMaterial}
          </div>
          <br />
        </div>
      );
    case 'special':
      return (
        <div>
          <div>
            <b>
              {props.part.name} {props.part.exerciseCount}
            </b>
          </div>
          <div>
            <i>{props.part.description}</i>
          </div>
          <div>
            <span>required skills: </span>
            {props.part.requirements.join(', ')}
          </div>
          <br />
        </div>
      );
    default:
      return assertNever(props.part);
  }
};
export default Part;
