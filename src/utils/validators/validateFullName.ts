export const validateFullName = (value: string): string => {
  const emptyFieldRegex = /^.+$/;
  const onlyLettersRegex = /^[\p{L}\s]*$/u;
  const max32CharactersRegex = /^.{1,32}$/;

  if (!emptyFieldRegex.test(value)) {
    return "This field cannot be empty.";
  }

  if (!onlyLettersRegex.test(value)) {
    return "You can only enter letters.";
  }

  if (!max32CharactersRegex.test(value)) {
    return "Maximum length of this field is 32 characters.";
  }

  return "";
};
