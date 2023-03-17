import { ContactData } from "./types/TypeContactData";
import { validateEmail } from "./validators/validateEmail";
import { validateFullName } from "./validators/validateFullName";
import { validateInputLength } from "./validators/validateInputLength";
import { validatePhoneNumber } from "./validators/validatePhoneNumber";

export const handleDisableAddButton = (newContact: ContactData) =>
  Boolean(
    validateFullName(newContact.fullName) ||
      validateEmail(newContact.email) ||
      validatePhoneNumber(newContact.phoneNumber) ||
      validateInputLength(newContact.address) ||
      validateInputLength(newContact.notes)
  );
