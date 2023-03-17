export const validatePassword = (value: string): string => {
  const emptyFieldRegex = /^.+$/;
  const min8CharactersRegex = /^.{8,}$/;
  const max32CharactersRegex = /^.{1,32}$/;

  if (!emptyFieldRegex.test(value)) {
    return "This field cannot be empty.";
  }

  if (!min8CharactersRegex.test(value)) {
    return "Password must be at least 8 characters long.";
  }

  if (!max32CharactersRegex.test(value)) {
    return "Password cannot be longer than 32 characters.";
  }

  return "";
};
