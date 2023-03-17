export const validateSecondPassword = (
  value: string,
  secondValue: string
): string => {
  if (value !== secondValue) {
    return "Entered passwords do not match.";
  }

  return "";
};
