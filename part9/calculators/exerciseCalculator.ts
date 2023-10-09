import { isArgumentsRightAmount, isNotNumber } from './utils';

interface Exercise {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: String;
  target: number;
  average: number;
}

interface Raiting {
  rating: number;
  ratingDescription: String;
}

interface ExerciseValue {
  trainingPeriod: Array<number>;
  target: number;
}

const ratingExercise: Array<Raiting> = [
  { rating: 1, ratingDescription: "let's try more next time" },
  { rating: 2, ratingDescription: 'not too bad but could be better' },
  { rating: 3, ratingDescription: 'great work' },
];

const calculatorExercise = (
  trainingPeriod: Array<number>,
  target: number
): Exercise => {
  const periodLength: number = trainingPeriod.length;
  const trainingDays: number = trainingPeriod.filter(
    (a: number) => a !== 0
  ).length;
  const average: number =
    trainingPeriod.reduce((p: number, a: number) => p + a, 0) / periodLength;
  const success: boolean = target <= average;
  const ratingRaw: number = target - Math.floor(average);
  const rating: number = ratingRaw > 1 ? 3 : -1 > ratingRaw ? 1 : 2;
  const ratingDescription: String = ratingExercise.find(
    (r: Raiting) => r.rating === rating
  ).ratingDescription;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseArguments = (args: string[]): ExerciseValue => {
  if (isArgumentsRightAmount(args, 2)) throw new Error('Wrong arguments');

  args.slice(2).forEach((a: string) => {
    if (isNotNumber(a)) throw new Error('Wrong arguments');
  });

  const trainingPeriod: Array<number> = args
    .slice(3)
    .map((a: string) => Number(a));
  const target: number = Number(args[2]);

  return { trainingPeriod, target };
};

try {
  const { trainingPeriod, target } = parseArguments(process.argv);
  console.log(calculatorExercise(trainingPeriod, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

//npm run calculateExercises 2 3 0 2 4.5 0 3 1
/*
{ periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.9285714285714286 
} */

//$ npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4
/* 
{ periodLength: 9,
  trainingDays: 6,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.7222222222222223 
} */
