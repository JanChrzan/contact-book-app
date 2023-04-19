import { Request, Response } from "express";
import { User } from "../../server/schema/userSchema";
import { ContactService } from "../../server/service/contactService";
import { InvalidUserIdError } from "../../server/utils/Errors";

jest.mock("../../server/schema/userSchema");

describe("ContactService authenticate", () => {
  const status = jest.fn();
  const json = jest.fn();
  const request: Partial<Request> = {
    body: {
      id: "123",
    },
    header: jest.fn().mockReturnValue("ipAddress"),
  };
  const response: Partial<Response> = {
    status,
    json,
  };
  const mockUser = {
    id: "123",
    ipAddress: "ipAddress",
  };

  const contactService = new ContactService();

  beforeEach(() => {
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    status.mockReturnValue(response);
  });

  it("should find user by id", async () => {
    await contactService.authenticate(request as Request, response as Response);

    expect(User.findOne).toHaveBeenCalledWith(
      { id: "123" },
      { _id: false, __v: false }
    );
  });

  it("should throw InvalidUserIdError if user not found", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    await expect(
      contactService.authenticate(request as Request, response as Response)
    ).rejects.toThrow(new InvalidUserIdError());
  });

  it("should return success message if user is authenticated", async () => {
    await contactService.authenticate(request as Request, response as Response);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({
      message: "User authenticated successfully.",
      data: "123",
    });
  });
});
