import { LoginFormData } from "./types/TypeLoginFormData";
import { validateEmail } from "./validators/validateEmail";
import { validatePassword } from "./validators/validatePassword";

export const handleDisableLoginButton = (loginData: LoginFormData) =>
  Boolean(
    validateEmail(loginData.email) || validatePassword(loginData.password)
  );
