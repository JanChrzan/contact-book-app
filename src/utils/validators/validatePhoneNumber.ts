export const validatePhoneNumber = (value: string): string => {
  const emptyFieldRegex = /^.+$/;
  const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;

  if (!emptyFieldRegex.test(value)) {
    return "This field cannot be empty.";
  }

  if (!phoneNumberRegex.test(value)) {
    return "The phone number is invalid.";
  }

  return "";
};
