import axios from "axios";
import { FormEvent } from "react";
import { handleSaveChanges } from "../../utils/handleSaveChanges";
import { ContactData } from "../../utils/types/TypeContactData";

jest.mock("axios");

describe("handleSaveChanges", () => {
  const setIsEditable = jest.fn();
  const setContacts = jest.fn();
  const setSelectedContact = jest.fn();
  const e = {
    preventDefault: jest.fn(),
  } as unknown as FormEvent<HTMLFormElement>;
  const contacts: ContactData[] = [
    {
      id: "1",
      ownerId: "1",
      fullName: "John Doe",
      address: "Street 123",
      email: "John1@example.com",
      phoneNumber: "987654321",
      notes: "",
    },
    {
      id: "2",
      ownerId: "2",
      fullName: "John Doe",
      address: "Street 321",
      email: "John2@example.com",
      phoneNumber: "123456789",
      notes: "",
    },
  ];
  const selectedContact: ContactData = contacts[0];
  const copySelectedContact: ContactData = {
    ...selectedContact,
    fullName: "Johnny Doe",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update contact and set state", async () => {
    (axios.put as jest.Mock).mockResolvedValueOnce({ data: {} });

    await handleSaveChanges({
      e,
      contacts,
      selectedContact,
      copySelectedContact,
      setIsEditable,
      setContacts,
      setSelectedContact,
    });

    expect(axios.put).toHaveBeenCalledWith(
      "https://janchrzan-server.herokuapp.com/api/contact",
      copySelectedContact
    );
    expect(setContacts).toHaveBeenCalledWith([
      copySelectedContact,
      contacts[1],
    ]);
    expect(setSelectedContact).toHaveBeenCalledWith(copySelectedContact);
    expect(setIsEditable).toHaveBeenCalledWith(false);
  });

  it("should handle error", async () => {
    const error = new Error("Network Error");
    (axios.put as jest.Mock).mockRejectedValueOnce(error);

    await handleSaveChanges({
      e,
      contacts,
      selectedContact,
      copySelectedContact,
      setIsEditable,
      setContacts,
      setSelectedContact,
    });

    expect(axios.put).toHaveBeenCalledWith(
      "https://janchrzan-server.herokuapp.com/api/contact",
      copySelectedContact
    );
    expect(setContacts).not.toHaveBeenCalled();
    expect(setSelectedContact).not.toHaveBeenCalled();
    expect(setIsEditable).not.toHaveBeenCalled();
  });
});
