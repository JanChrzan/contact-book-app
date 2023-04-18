import { handleDisableLoginButton } from "../../utils/handleDisableLoginButton";
import { LoginFormData } from "../../utils/types/TypeLoginFormData";

describe("handleDisableLoginButton", () => {
  it("returns true if the email is invalid", () => {
    const newLoginData: LoginFormData = {
      email: "invalid-email",
      password: "123456789",
    };
    expect(handleDisableLoginButton(newLoginData)).toBe(true);
  });

  it("returns true if the email is empty", () => {
    const newLoginData: LoginFormData = {
      email: "",
      password: "123456789",
    };
    expect(handleDisableLoginButton(newLoginData)).toBe(true);
  });

  it("returns true if the password is invalid", () => {
    const newLoginData: LoginFormData = {
      email: "john@example.com",
      password: "123",
    };
    expect(handleDisableLoginButton(newLoginData)).toBe(true);
  });

  it("returns true if the password is empty", () => {
    const newLoginData: LoginFormData = {
      email: "john@example.com",
      password: "",
    };
    expect(handleDisableLoginButton(newLoginData)).toBe(true);
  });
  it("returns false if all fields are valid", () => {
    const newLoginData: LoginFormData = {
      email: "john@example.com",
      password: "123456789",
    };
    expect(handleDisableLoginButton(newLoginData)).toBe(false);
  });
});
