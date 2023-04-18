import axios from "axios";
import { FormEvent } from "react";
import { SERVER_URL } from "../../../config";
import { handleRegister } from "../../utils/handleRegister";
import { getUserIp } from "../../utils/getUserIp";
import { RegisterFormData } from "../../utils/types/TypeRegisterFormData";

jest.mock("axios");
jest.mock("../../utils/getUserIp");

describe("handleRegister", () => {
  const setRegisterData = jest.fn();
  const setErrorMessage = jest.fn();
  const setIsRegister = jest.fn();
  const navigate = jest.fn();
  const e = {
    preventDefault: jest.fn(),
  } as unknown as FormEvent<HTMLFormElement>;
  const registerData: RegisterFormData = {
    id: "test-id",
    fullName: "Test User",
    email: "test@example.com",
    password: "password",
    secondPassword: "password",
  };
  const ip = "127.0.0.1";

  beforeEach(() => {
    (getUserIp as jest.Mock).mockResolvedValue(ip);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should prevent default form submission", async () => {
    await handleRegister({
      e,
      registerData,
      setRegisterData,
      setErrorMessage,
      setIsRegister,
      navigate,
    });
    expect(e.preventDefault).toHaveBeenCalled();
  });

  it("should successfully register in the user", async () => {
    const mockResponse = { data: { data: "token" } };
    (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);
    await handleRegister({
      e,
      registerData,
      setRegisterData,
      setErrorMessage,
      setIsRegister,
      navigate,
    });
    expect(axios.post).toHaveBeenCalledWith(
      `${SERVER_URL}/api/register`,
      {
        id: registerData.id,
        fullName: registerData.fullName,
        email: registerData.email,
        password: registerData.password,
      },
      { headers: { "header-ip": ip } }
    );
  });

  it("should handle server error", async () => {
    const errorMessage = "Error message";
    (axios.post as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: errorMessage } },
    });
    await handleRegister({
      e,
      registerData,
      setRegisterData,
      setErrorMessage,
      setIsRegister,
      navigate,
    });
    expect(setErrorMessage).toHaveBeenCalledWith(errorMessage);
  });

  it("should handle network error", async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce({});
    await handleRegister({
      e,
      registerData,
      setRegisterData,
      setErrorMessage,
      setIsRegister,
      navigate,
    });
    expect(setErrorMessage).toHaveBeenCalledWith(
      "No connection to the server. Please try again later."
    );
  });
});
