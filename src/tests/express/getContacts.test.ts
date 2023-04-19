import { Request, Response } from "express";
import { Contact } from "../../server/schema/contactSchema";
import { ContactService } from "../../server/service/contactService";
import { ContactData } from "../../utils/types/TypeContactData";

jest.mock("../../server/schema/contactSchema");

describe("ContactService getContacts", () => {
  const status = jest.fn();
  const json = jest.fn();
  const request: Partial<Request> = {
    params: {
      id: "123",
    },
  };
  const response: Partial<Response> = {
    status,
    json,
  };
  const mockContacts: ContactData[] = [
    {
      id: "1",
      ownerId: "123",
      fullName: "John Doe",
      address: "Address 1",
      email: "john@example.com",
      phoneNumber: "123456789",
      notes: "Notes 1",
    },
    {
      id: "2",
      ownerId: "123",
      fullName: "Jade Doe",
      address: "Address 2",
      email: "Jade@example.com",
      phoneNumber: "987654321",
      notes: "Notes 2",
    },
  ];

  const contactService = new ContactService();

  beforeEach(() => {
    (Contact.find as jest.Mock).mockResolvedValue(mockContacts);
    status.mockReturnValue(response);
  });

  it("should find contacts by ownerId", async () => {
    await contactService.getContacts(request as Request, response as Response);

    expect(Contact.find).toHaveBeenCalledWith(
      { ownerId: "123" },
      { _id: false, __v: false }
    );
  });

  it("should return success message with contacts data", async () => {
    await contactService.getContacts(request as Request, response as Response);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({
      message: "Contacts fetched successfully.",
      data: mockContacts,
    });
  });
});
