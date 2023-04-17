import { handleDisableAddButton } from "../../utils/handleDisableAddButton";
import { ContactData } from "../../utils/types/TypeContactData";

describe("handleDisableAddButton", () => {
  it("returns true if the full name is invalid", () => {
    const newContact: ContactData = {
      id: "",
      ownerId: "",
      fullName: "",
      email: "john@example.com",
      phoneNumber: "1234567890",
      address: "Street 123",
      notes: "Test",
    };
    expect(handleDisableAddButton(newContact)).toBe(true);
  });

  it("returns true if the full name is empty", () => {
    const newContact: ContactData = {
      id: "",
      ownerId: "",
      fullName: "",
      email: "john@example.com",
      phoneNumber: "1234567890",
      address: "Street 123",
      notes: "Test",
    };
    expect(handleDisableAddButton(newContact)).toBe(true);
  });

  it("returns true if the email is invalid", () => {
    const newContact: ContactData = {
      id: "",
      ownerId: "",
      fullName: "John Doe",
      email: "invalid-email",
      phoneNumber: "1234567890",
      address: "Street 123",
      notes: "Test",
    };
    expect(handleDisableAddButton(newContact)).toBe(true);
  });

  it("returns true if the email is empty", () => {
    const newContact: ContactData = {
      id: "",
      ownerId: "",
      fullName: "John Doe",
      email: "",
      phoneNumber: "1234567890",
      address: "Street 123",
      notes: "Test",
    };
    expect(handleDisableAddButton(newContact)).toBe(true);
  });

  it("returns true if the phone number is invalid", () => {
    const newContact: ContactData = {
      id: "",
      ownerId: "",
      fullName: "John Doe",
      email: "john@example.com",
      phoneNumber: "invalid-phone-number",
      address: "Street 123",
      notes: "Test",
    };
    expect(handleDisableAddButton(newContact)).toBe(true);
  });

  it("returns true if the phone number is empty", () => {
    const newContact: ContactData = {
      id: "",
      ownerId: "",
      fullName: "John Doe",
      email: "john@example.com",
      phoneNumber: "",
      address: "Street 123",
      notes: "Test",
    };
    expect(handleDisableAddButton(newContact)).toBe(true);
  });

  it("returns false if all fields are valid", () => {
    const newContact: ContactData = {
      id: "",
      ownerId: "",
      fullName: "John Doe",
      email: "john@example.com",
      phoneNumber: "1234567890",
      address: "Street 123",
      notes: "Test",
    };
    expect(handleDisableAddButton(newContact)).toBe(false);
  });
});
