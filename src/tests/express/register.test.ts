import { Request, Response } from "express";
import { User } from "../../server/schema/userSchema";
import { ContactService } from "../../server/service/contactService";
import {
  InvalidDataError,
  UserAlreadyExistsError,
} from "../../server/utils/Errors";
import bcrypt from "bcrypt";

jest.mock("../../server/schema/userSchema");
jest.mock("bcrypt");

describe("ContactService register", () => {
  const status = jest.fn();
  const json = jest.fn();
  const request: Partial<Request> = {
    body: {
      id: "123",
      fullName: "John Doe",
      email: "john@example.com",
      password: "password",
    },
    header: jest.fn().mockReturnValue("ipAddress"),
  };
  const response: Partial<Response> = {
    status,
    json,
  };
  const mockUser = {
    id: "123",
    password: "hashedPassword",
  };

  const contactService = new ContactService();

  beforeEach(() => {
    (User.exists as jest.Mock).mockResolvedValue(false);
    (User.prototype.save as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
    status.mockReturnValue(response);
  });

  it("should check if user already exists", async () => {
    await contactService.register(request as Request, response as Response);

    expect(User.exists).toHaveBeenCalledWith({ email: "john@example.com" });
  });

  it("should throw UserAlreadyExistsError if user already exists", async () => {
    (User.exists as jest.Mock).mockResolvedValue(true);

    await expect(
      contactService.register(request as Request, response as Response)
    ).rejects.toThrow(new UserAlreadyExistsError());
  });

  it("should hash password", async () => {
    await contactService.register(request as Request, response as Response);

    expect(bcrypt.hash).toHaveBeenCalledWith("password", 10);
  });

  it("should save user", async () => {
    await contactService.register(request as Request, response as Response);

    expect(User.prototype.save).toHaveBeenCalled();
  });

  it("should throw InvalidDataError if save fails", async () => {
    (User.prototype.save as jest.Mock).mockRejectedValue(new Error());

    await expect(
      contactService.register(request as Request, response as Response)
    ).rejects.toThrow(new InvalidDataError());
  });

  it("should return success message", async () => {
    await contactService.register(request as Request, response as Response);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({
      message: "User registered successfully.",
    });
  });
});
