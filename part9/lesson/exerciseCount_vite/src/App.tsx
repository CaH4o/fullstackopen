import { CoursePart } from './types';
import { assertNever } from './utils';

const App = () => {
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
      kind: 'basic',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: 'group',
    },
    {
      name: 'Basics of type Narrowing',
      exerciseCount: 7,
      description: 'How to go from unknown to string',
      kind: 'basic',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      backgroundMaterial:
        'https://type-level-typescript.com/template-literal-types',
      kind: 'background',
    },
  ];

  courseParts.forEach((part: CoursePart) => {
    switch (part.kind) {
      case 'basic':
        console.log(part.name, part.exerciseCount, part.description);
        break;
      case 'group':
        console.log(part.name, part.exerciseCount, part.groupProjectCount);
        break;
      case 'background':
        console.log(
          part.name,
          part.exerciseCount,
          part.description,
          part.backgroundMaterial
        );
        break;
      default:
        return assertNever(part);
        break;
    }
  });

  return <div>App</div>;
};

export default App;
