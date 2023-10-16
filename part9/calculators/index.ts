import express from 'express';

import { isNotNumber, isNotNumberArray } from './utils';
import { calculateBmi } from './bmiCalculator';
import { Exercise, calculatorExercise } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight }: { height?: string; weight?: string } = req.query;

  if (height === undefined || isNotNumber(height)) {
    res.send({ error: 'malformatted parameters - Wrong height' });
  }
  if (weight === undefined || isNotNumber(weight)) {
    res.send({ error: 'malformatted parameters - Wrong weight' });
  }

  const bmi: string = calculateBmi(Number(height), Number(weight));

  res.send({
    'weight': weight,
    'height': height,
    'bmi': bmi,
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    res.send({ error: 'parameters missing' });
  }

  if (isNotNumber(target) || isNotNumberArray(daily_exercises)) {
    res.send({ error: 'malformatted parameters' });
  }

  const exercise: Exercise = calculatorExercise(
    daily_exercises as Array<number>,
    Number(target)
  );

  res.json(exercise);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
