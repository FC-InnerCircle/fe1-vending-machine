const isInteger = (strNumber: string) => {
  const number = Number(strNumber);

  if (isNaN(number)) return false;
  if (number < 0) return false;
  if (!Number.isInteger(number)) return false;
  return true;
};

export { isInteger };
