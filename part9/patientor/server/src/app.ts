import express from 'express';
import cors from 'cors';

import diagnosRoute from './routes/diagnos';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosRoute);

export default app;
