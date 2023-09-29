// -------------------------- 1 ------------------------------- //
/* 
const multiplicator = (a, b, printText) => {
  console.log(printText, a * b)
}

//multiplicator(2, 4, 'Multiplied numbers 2 and 4, the result is:')
multiplicator('how about a string?', 4, 'Multiplied a string and 4, the result is:');
*/
// -------------------------- 2 ------------------------------- //
/* 
const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText, a * b)
}

multiplicator(
  'how about a string?',
  4,
  'Multiplied a string and 4, the result is:'
)
 */
// -------------------------- 3 ------------------------------- //
/* 
type Operation = 'multiply' | 'add' | 'divide';
type Result = string | number;

// const calculator = (a: number, b: number, op: Operation) => {
//const calculator = (a: number, b: number, op: Operation): number => {
//const calculator = (a: number, b: number, op: Operation): number | string => {
const calculator = (a: number, b: number, op: Operation): Result => {
  if (op === 'multiply') {
    return a * b;
  } else if (op === 'add') {
    return a + b;
  } else if (op === 'divide') {
    if (b === 0) return "can't divide by 0!";
    return a / b;
  }
};

calculator(2, 4, 'divide');
 */
// -------------------------- 4 ------------------------------- //

type Operation = 'multiply' | 'add' | 'divide';

const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case 'multiply':
      return a * b;
    case 'divide':
      if (b === 0) throw new Error("Can't divide by 0!");
      return a / b;
    case 'add':
      return a + b;
    default:
      throw new Error('Operation is not multiply, add or divide!');
  }
};

try {
  console.log(calculator(1, 5, 'divide'));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
