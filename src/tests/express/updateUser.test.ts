import { Request, Response } from "express";
import { User } from "../../server/schema/userSchema";
import { ContactService } from "../../server/service/contactService";
import { UserNotFoundError } from "../../server/utils/Errors";

jest.mock("../../server/schema/userSchema");

describe("ContactService updateUser", () => {
  const status = jest.fn();
  const json = jest.fn();
  const request: Partial<Request> = {
    body: {
      id: "123",
    },
    header: jest.fn().mockReturnValue("newIpAddress"),
  };
  const response: Partial<Response> = {
    status,
    json,
  };
  const mockUser = {
    id: "123",
    ipAddress: "newIpAddress",
  };

  const contactService = new ContactService();

  beforeEach(() => {
    (User.findOneAndUpdate as jest.Mock).mockResolvedValue(mockUser);
    status.mockReturnValue(response);
  });

  it("should update user by id", async () => {
    await contactService.updateUser(request as Request, response as Response);

    expect(User.findOneAndUpdate).toHaveBeenCalledWith(
      { id: "123" },
      { ipAddress: "newIpAddress" },
      { new: true }
    );
  });

  it("should throw UserNotFoundError if user not found", async () => {
    (User.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(
      contactService.updateUser(request as Request, response as Response)
    ).rejects.toThrow(new UserNotFoundError());
  });

  it("should return success message if user is updated", async () => {
    await contactService.updateUser(request as Request, response as Response);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({
      message: "User updated successfully.",
      data: "123",
    });
  });
});
