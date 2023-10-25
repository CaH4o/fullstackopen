import express from 'express';

import diaryService from '../services/diaryService';
import toNewDiaryEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  //res.send('Fetching all diaries!');
  res.send(diaryService.getNonSensitiveEntries());
});

//6
//router.post('/', (_req, res) => {
//  res.send('Saving a diary!');
//});

//7-1
//router.post('/', (req, res) => {
//  const { date, weather, visibility, comment } = req.body;
//  const addedEntry = diaryService.addDiary(date, weather, visibility, comment);
//  res.json(addedEntry);
//});

//7-2
//router.post('/', (req, res) => {
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//  const { date, weather, visibility, comment } = req.body;
//  const newDiaryEntry = diaryService.addDiary({
//    date,
//    weather,
//    visibility,
//    comment,
//  });
//  res.json(newDiaryEntry);
//});

//8
router.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);

    const addedEntry = diaryService.addDiary(newDiaryEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

export default router;
