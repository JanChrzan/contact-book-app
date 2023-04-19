import { Request, Response } from "express";
import { Contact } from "../../server/schema/contactSchema";
import { ContactService } from "../../server/service/contactService";
import { InvalidDataError } from "../../server/utils/Errors";

jest.mock("../../server/schema/contactSchema");

describe("ContactService addContact", () => {
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
    (Contact.prototype.save as jest.Mock).mockResolvedValue(mockContact);
    status.mockReturnValue(response);
  });

  it("should create new contact with provided data", async () => {
    await contactService.addContact(request as Request, response as Response);

    expect(Contact.prototype.save).toHaveBeenCalled();
  });

  it("should throw InvalidDataError if save fails", async () => {
    (Contact.prototype.save as jest.Mock).mockRejectedValue(new Error());

    await expect(
      contactService.addContact(request as Request, response as Response)
    ).rejects.toThrow(new InvalidDataError());
  });

  it("should return success message if contact is added", async () => {
    await contactService.addContact(request as Request, response as Response);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({
      message: "Contact added successfully.",
    });
  });
});
