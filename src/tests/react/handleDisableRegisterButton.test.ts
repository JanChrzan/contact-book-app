import { handleDisableRegisterButton } from "../../utils/handleDisableRegisterButton";
import { RegisterFormData } from "../../utils/types/TypeRegisterFormData";

describe("handleDisableRegisterButton", () => {
  it("returns true if the fullName is invalid", () => {
    const newRegisterData: RegisterFormData = {
      id: "",
      fullName: "1",
      email: "john@example.com",
      password: "123456789",
      secondPassword: "123456789",
    };
    expect(handleDisableRegisterButton(newRegisterData)).toBe(true);
  });

  it("returns true if the fullName is empty", () => {
    const newRegisterData: RegisterFormData = {
      id: "",
      fullName: "",
      email: "john@example.com",
      password: "123456789",
      secondPassword: "123456789",
    };
    expect(handleDisableRegisterButton(newRegisterData)).toBe(true);
  });

  it("returns true if the email is invalid", () => {
    const newRegisterData: RegisterFormData = {
      id: "",
      fullName: "John Doe",
      email: "johnexample.com",
      password: "123456789",
      secondPassword: "123456789",
    };
    expect(handleDisableRegisterButton(newRegisterData)).toBe(true);
  });

  it("returns true if the email is empty", () => {
    const newRegisterData: RegisterFormData = {
      id: "",
      fullName: "John Doe",
      email: "",
      password: "123456789",
      secondPassword: "123456789",
    };
    expect(handleDisableRegisterButton(newRegisterData)).toBe(true);
  });

  it("returns true if the password is invalid", () => {
    const newRegisterData: RegisterFormData = {
      id: "",
      fullName: "John Doe",
      email: "john@example.com",
      password: "123",
      secondPassword: "123",
    };
    expect(handleDisableRegisterButton(newRegisterData)).toBe(true);
  });

  it("returns true if the password is empty", () => {
    const newRegisterData: RegisterFormData = {
      id: "",
      fullName: "John Doe",
      email: "john@example.com",
      password: "",
      secondPassword: "",
    };
    expect(handleDisableRegisterButton(newRegisterData)).toBe(true);
  });

  it("returns true if the secondPassword is invalid", () => {
    const newRegisterData: RegisterFormData = {
      id: "",
      fullName: "John Doe",
      email: "john@example.com",
      password: "123456789",
      secondPassword: "123",
    };
    expect(handleDisableRegisterButton(newRegisterData)).toBe(true);
  });

  it("returns true if the secondPassword is empty", () => {
    const newRegisterData: RegisterFormData = {
      id: "",
      fullName: "John Doe",
      email: "john@example.com",
      password: "123456789",
      secondPassword: "",
    };
    expect(handleDisableRegisterButton(newRegisterData)).toBe(true);
  });

  it("returns false if all fields are valid", () => {
    const newRegisterData: RegisterFormData = {
      id: "",
      fullName: "John Doe",
      email: "john@example.com",
      password: "123456789",
      secondPassword: "123456789",
    };
    expect(handleDisableRegisterButton(newRegisterData)).toBe(false);
  });
});
