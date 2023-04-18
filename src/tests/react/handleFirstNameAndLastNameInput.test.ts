import { ChangeEvent } from "react";
import { handleFirstNameAndLastNameInput } from "../../utils/handleFirstNameAndLastNameInput";
import { ContactData } from "../../utils/types/TypeContactData";

describe("handleFirstNameAndLastNameInput", () => {
  it("updates the first name and full name when the first name input changes", () => {
    const setFirstName = jest.fn();
    const setLastName = jest.fn();
    const setData = jest.fn();
    const data: ContactData = {
      id: "",
      ownerId: "",
      fullName: "",
      address: "",
      email: "",
      phoneNumber: "",
      notes: "",
    };
    const e = {
      target: { name: "First", value: "John" },
    } as ChangeEvent<HTMLInputElement>;

    handleFirstNameAndLastNameInput({
      e,
      firstName: "",
      setFirstName,
      lastName: "Doe",
      setLastName,
      data,
      setData,
    });

    expect(setFirstName).toHaveBeenCalledWith("John");
    expect(setData).toHaveBeenCalledWith({
      id: "",
      ownerId: "",
      fullName: "John Doe",
      address: "",
      email: "",
      phoneNumber: "",
      notes: "",
    });
  });

  it("updates the last name and full name when the last name input changes", () => {
    const setFirstName = jest.fn();
    const setLastName = jest.fn();
    const setData = jest.fn();
    const data: ContactData = {
      id: "",
      ownerId: "",
      fullName: "",
      address: "",
      email: "",
      phoneNumber: "",
      notes: "",
    };
    const e = {
      target: { name: "Last", value: "Doe" },
    } as any;

    handleFirstNameAndLastNameInput({
      e,
      firstName: "John",
      setFirstName,
      lastName: "",
      setLastName,
      data,
      setData,
    });

    expect(setLastName).toHaveBeenCalledWith("Doe");
    expect(setData).toHaveBeenCalledWith({
      id: "",
      ownerId: "",
      fullName: "John Doe",
      address: "",
      email: "",
      phoneNumber: "",
      notes: "",
    });
  });
});
