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

// The function calculates a BMI based on a given height (in centimeters)
// and weight (in kilograms) and then returns a message that suits the results.
const calculateBmi = (height: number, weight: number): string => {
  const heightInM: number = height / 100;
  const bmiRaw: number = weight / (heightInM * heightInM);
  const bmi: number = Math.round(bmiRaw * 10) / 10;
  return basicCategoriesBmi.find((c) => c.to >= bmi && bmi >= c.from).category;
};

console.log(calculateBmi(180, 74));
