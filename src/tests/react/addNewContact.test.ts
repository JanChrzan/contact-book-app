import axios from "axios";
import Cookies from "js-cookie";
import { FormEvent } from "react";
import { addNewContact } from "../../utils/addNewContact";
import { ContactData } from "../../utils/types/TypeContactData";

jest.mock("axios");
jest.mock("js-cookie");

const mockedCookies = Cookies as jest.Mocked<typeof Cookies>;

describe("addNewContact", () => {
  const setContacts = jest.fn();
  const setNewContact = jest.fn();
  const setErrorMessage = jest.fn();
  const setShowHomePage = jest.fn();
  const contacts: ContactData[] = [];
  const newContact: ContactData = {
    id: "1",
    ownerId: "1",
    fullName: "John Doe",
    address: "Street 1",
    email: "john@example.com",
    phoneNumber: "123456789",
    notes: "notes",
  };
  const event = {
    preventDefault: jest.fn(),
  } as unknown as FormEvent<HTMLFormElement>;

  beforeEach(() => {
    (axios.post as jest.Mock).mockResolvedValue({});
    mockedCookies.get.mockReturnValue({ token: "1" });
  });

  it("should add a new contact", async () => {
    await addNewContact(event, {
      contacts,
      setContacts,
      newContact,
      setNewContact,
      setErrorMessage,
      setShowHomePage,
    });
    expect(axios.post).toHaveBeenCalledWith(
      "https://janchrzan-server.herokuapp.com/api/contact",
      newContact
    );
    expect(setContacts).toHaveBeenCalledWith([newContact]);
    expect(setNewContact).toHaveBeenCalled();
    expect(setShowHomePage).toHaveBeenCalledWith(true);
    expect(setErrorMessage).toHaveBeenCalledWith("");
  });

  it("should handle errors", async () => {
    const error = new Error("Test error");
    (axios.post as jest.Mock).mockRejectedValue(error);
    await addNewContact(event, {
      contacts,
      setContacts,
      newContact,
      setNewContact,
      setErrorMessage,
      setShowHomePage,
    });
    expect(setErrorMessage).toHaveBeenCalledWith(
      "No connection to the server. Please try again later."
    );
  });
});
