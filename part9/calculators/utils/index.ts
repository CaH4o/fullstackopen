export const isNotNumber = (argument: any): boolean => isNaN(Number(argument));

export const isArgumentsRightAmount = (
  args: string[],
  min: number,
  max: number = 0
): boolean => {
  if (args.length - 2 < min) return true;
  if (max && args.length - 2 > min + max) return true;
  return false;
};
