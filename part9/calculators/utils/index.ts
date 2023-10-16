export const isNotNumber = (argument: unknown): boolean =>
  isNaN(Number(argument));

export const isArgumentsRightAmount = (
  args: string[],
  min: number,
  max: number = 0
): boolean => {
  if (args.length - 2 < min) return true;
  if (max && args.length - 2 > min + max) return true;
  return false;
};

export const isNotNumberArray = (argument: unknown): boolean => {
  return !(Array.isArray(argument)
    ? argument.every((value: unknown) => typeof value === 'number')
    : false);
};
