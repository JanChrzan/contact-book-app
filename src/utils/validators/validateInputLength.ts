export const validateInputLength = (value: string): string => {
  const InputLengthRegex = /^.{0,200}$/;

  if (!InputLengthRegex.test(value)) {
    return "Invalid input length.";
  }

  return "";
};
