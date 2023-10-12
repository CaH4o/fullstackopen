import { isArgumentsRightAmount, isNotNumber } from './utils';

interface BCB {
  from: number;
  to: number;
  category: string;
}

const basicCategoriesBmi: Array<BCB> = [
  { from: 0, to: 15.9, category: 'Underweight (Severe thinness)' },
  { from: 16.0, to: 16.9, category: 'Underweight (Moderate thinness)' },
  { from: 17.0, to: 18.4, category: 'Underweight (Mild thinness)' },
  { from: 18.5, to: 24.9, category: 'Normal range' },
  { from: 25.0, to: 29.9, category: 'Overweight (Pre-obese)' },
  { from: 30.0, to: 34.9, category: 'Obese (Class I)' },
  { from: 35.0, to: 39.9, category: 'Obese (Class II)' },
  { from: 40.0, to: 99.0, category: 'Obese (Class III)' },
];

interface ExerciseValue {
  height: number;
  weight: number;
}

// The function calculates a BMI based on a given height (in centimeters)
// and weight (in kilograms) and then returns a message that suits the results.
export const calculateBmi = (height: number, weight: number): string => {
  const heightInM: number = height / 100;
  const bmiRaw: number = weight / (heightInM * heightInM);
  const bmi: number = Math.round(bmiRaw * 10) / 10;
  const resultBmi: BCB | undefined = basicCategoriesBmi.find(
    (c: BCB) => c.to >= bmi && bmi >= c.from
  );
  return resultBmi ? resultBmi.category : 'error';
};

const parseArguments = (args: string[]): ExerciseValue => {
  if (isArgumentsRightAmount(args, 2, 1)) throw new Error('Wrong arguments');

  args.slice(2).forEach((a: string) => {
    if (isNotNumber(a)) throw new Error('Wrong arguments');
  });

  const height: number = Number(args[2]);
  const weight: number = Number(args[3]);

  return { height, weight };
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

//npm run calculateBmi 180 74
//npm run calculateBmi 180 91
