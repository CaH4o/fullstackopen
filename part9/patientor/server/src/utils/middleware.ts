import { Request, Response, NextFunction } from 'express';

import pationtsService from '../services/pationts';

const getPatient = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response<unknown, Record<string, unknown>> => {
  const patient = pationtsService.getOneById(req.params.id);

  if (!patient) {
    return res.status(404).send({ error: 'not found' });
  }

  req.body.patient = patient;

  next();
};

export default { getPatient };
