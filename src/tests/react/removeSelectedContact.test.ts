import axios from "axios";
import { removeSelectedContact } from "../../utils/removeSelectedContact";
import { ContactData } from "../../utils/types/TypeContactData";

jest.mock("axios");

describe("removeSelectedContact", () => {
  const setContacts = jest.fn();
  const setSelectedContact = jest.fn();
  const setShowDetails = jest.fn();
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should do nothing if selectedContact is null", async () => {
    await removeSelectedContact({
      contacts,
      selectedContact: null,
      setContacts,
      setSelectedContact,
      setShowDetails,
    });

    expect(axios.delete).not.toHaveBeenCalled();
    expect(setContacts).not.toHaveBeenCalled();
    expect(setSelectedContact).not.toHaveBeenCalled();
    expect(setShowDetails).not.toHaveBeenCalled();
  });

  it("should remove selected contact and update state", async () => {
    (axios.delete as jest.Mock).mockResolvedValueOnce({ data: {} });

    await removeSelectedContact({
      contacts,
      selectedContact,
      setContacts,
      setSelectedContact,
      setShowDetails,
    });

    expect(axios.delete).toHaveBeenCalledWith(
      "https://janchrzan-server.herokuapp.com/api/contact/1"
    );
    expect(setContacts).toHaveBeenCalledWith([contacts[1]]);
    expect(setSelectedContact).toHaveBeenCalledWith(null);
    expect(setShowDetails).toHaveBeenCalledWith(false);
  });

  it("should handle error", async () => {
    const error = new Error("Network Error");
    (axios.delete as jest.Mock).mockRejectedValueOnce(error);

    await removeSelectedContact({
      contacts,
      selectedContact,
      setContacts,
      setSelectedContact,
      setShowDetails,
    });

    expect(axios.delete).toHaveBeenCalledWith(
      "https://janchrzan-server.herokuapp.com/api/contact/1"
    );
    expect(setContacts).not.toHaveBeenCalled();
    expect(setSelectedContact).not.toHaveBeenCalled();
    expect(setShowDetails).not.toHaveBeenCalled();
  });
});
