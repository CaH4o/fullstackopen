import express from 'express';

import pationtsService from '../services/pationts';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(pationtsService.getWithoutSNN());
});

export default router;
