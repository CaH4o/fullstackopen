import express from 'express';

import { isNotNumber } from './utils';
import { calculateBmi } from './bmiCalculator';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
