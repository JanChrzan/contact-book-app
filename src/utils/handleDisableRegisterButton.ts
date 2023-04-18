import { RegisterFormData } from "./types/TypeRegisterFormData";
import { validateEmail } from "./validators/validateEmail";
import { validateFullName } from "./validators/validateFullName";
import { validatePassword } from "./validators/validatePassword";
import { validateSecondPassword } from "./validators/validateSecondPassword";

export const handleDisableRegisterButton = (registerData: RegisterFormData) =>
  Boolean(
    validateFullName(registerData.fullName) ||
      validateEmail(registerData.email) ||
      validatePassword(registerData.password) ||
      validateSecondPassword(registerData.password, registerData.secondPassword)
  );
