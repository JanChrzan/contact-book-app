import { Request, Response } from "express";
import { Contact } from "../../server/schema/contactSchema";
import { ContactService } from "../../server/service/contactService";
import { ContactNotFoundError } from "../../server/utils/Errors";

jest.mock("../../server/schema/contactSchema");

describe("ContactService editContact", () => {
  const status = jest.fn();
  const json = jest.fn();
  const request: Partial<Request> = {
    body: {
      id: "1",
      ownerId: "123",
      fullName: "John Doe",
      address: "Street 1",
      email: "john@example.com",
      phoneNumber: "123456789",
      notes: "Notes 1",
    },
  };
  const response: Partial<Response> = {
    status,
    json,
  };
  const mockContact = new Contact(request.body);

  const contactService = new ContactService();

  beforeEach(() => {
    (Contact.findOneAndUpdate as jest.Mock).mockResolvedValue(mockContact);
    status.mockReturnValue(response);
  });

  it("should update contact with provided data", async () => {
    await contactService.editContact(request as Request, response as Response);

    expect(Contact.findOneAndUpdate).toHaveBeenCalledWith(
      { id: "1" },
      {
        ownerId: "123",
        fullName: "John Doe",
        address: "Street 1",
        email: "john@example.com",
        phoneNumber: "123456789",
        notes: "Notes 1",
      },
      { new: true }
    );
  });

  it("should throw ContactNotFoundError if contact not found", async () => {
    (Contact.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(
      contactService.editContact(request as Request, response as Response)
    ).rejects.toThrow(new ContactNotFoundError());
  });

  it("should return success message if contact is edited", async () => {
    await contactService.editContact(request as Request, response as Response);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({
      message: "Contact edited successfully.",
    });
  });
});
