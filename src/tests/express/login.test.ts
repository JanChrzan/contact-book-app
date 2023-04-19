import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../../server/schema/userSchema";
import { ContactService } from "../../server/service/contactService";
import { InvalidCredentialsError } from "../../server/utils/Errors";

jest.mock("../../server/schema/userSchema");
jest.mock("bcrypt");

describe("ContactService login", () => {
  const status = jest.fn();
  const json = jest.fn();
  const request: Partial<Request> = {
    body: {
      email: "john@example.com",
      password: "password",
    },
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
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    status.mockReturnValue(response);
  });

  it("should find user by email", async () => {
    await contactService.login(request as Request, response as Response);

    expect(User.findOne).toHaveBeenCalledWith(
      { email: "john@example.com" },
      { _id: false, __v: false }
    );
  });

  it("should throw InvalidCredentialsError if user not found", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    await expect(
      contactService.login(request as Request, response as Response)
    ).rejects.toThrow(new InvalidCredentialsError());
  });

  it("should compare password with hashed password", async () => {
    await contactService.login(request as Request, response as Response);

    expect(bcrypt.compare).toHaveBeenCalledWith("password", "hashedPassword");
  });

  it("should throw InvalidCredentialsError if password is invalid", async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      contactService.login(request as Request, response as Response)
    ).rejects.toThrow(new InvalidCredentialsError());
  });

  it("should return user id if login successful", async () => {
    await contactService.login(request as Request, response as Response);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({
      message: "User logged in successfully.",
      data: "123",
    });
  });
});
