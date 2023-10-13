// -------------------------- 6 ------------------------------- //
import express from 'express';

const app = express();
// -------------------------- 7 ------------------------------- //

import { calculator, Operation } from './calculator';

app.use(express.json());

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if (!value1 || isNaN(Number(value1))) {
    return res.status(400).send({ error: 'value1 is wrong' });
  }

  if (!value2 || isNaN(Number(value1))) {
    return res.status(400).send({ error: 'value2 is wrong' });
  }

  if (!op) {
    return res.status(400).send({ error: 'op is wrong' });
  }

  //const result = calculator(value1, value2, op);
  const result = calculator(Number(value1), Number(value2), op as Operation);
  return res.send({ result });
});

// -------------------------- 6 ------------------------------- //

app.get('/ping', (_req, res) => {
  res.send('pong');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
