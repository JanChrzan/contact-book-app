import { Request, Response } from "express";
import { Contact } from "../../server/schema/contactSchema";
import { ContactService } from "../../server/service/contactService";
import { ContactNotFoundError } from "../../server/utils/Errors";

jest.mock("../../server/schema/contactSchema");

describe("ContactService removeContact", () => {
  const status = jest.fn();
  const json = jest.fn();
  const request: Partial<Request> = {
    params: {
      id: "1",
    },
  };
  const response: Partial<Response> = {
    status,
    json,
  };
  const mockContact = {
    id: "1",
    ownerId: "123",
    fullName: "John Doe",
    address: "Street 1",
    email: "john@example.com",
    phoneNumber: "123456789",
    notes: "Notes 1",
  };

  const contactService = new ContactService();

  beforeEach(() => {
    (Contact.findOne as jest.Mock).mockResolvedValue(mockContact);
    (Contact.findOneAndRemove as jest.Mock).mockResolvedValue(mockContact);
    status.mockReturnValue(response);
  });

  it("should find contact by id", async () => {
    await contactService.removeContact(
      request as Request,
      response as Response
    );

    expect(Contact.findOne).toHaveBeenCalledWith(
      { id: "1" },
      { _id: false, __v: false }
    );
  });

  it("should throw ContactNotFoundError if contact not found", async () => {
    (Contact.findOne as jest.Mock).mockResolvedValue(null);

    await expect(
      contactService.removeContact(request as Request, response as Response)
    ).rejects.toThrow(new ContactNotFoundError());
  });

  it("should remove contact by id", async () => {
    await contactService.removeContact(
      request as Request,
      response as Response
    );

    expect(Contact.findOneAndRemove).toHaveBeenCalledWith({ id: "1" });
  });

  it("should return success message if contact is removed", async () => {
    await contactService.removeContact(
      request as Request,
      response as Response
    );

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({
      message: "Contact removed successfully.",
    });
  });
});
