import axios from "axios";
import { FormEvent } from "react";
import { SERVER_URL } from "../../../config";
import { getUserIp } from "../../utils/getUserIp";
import { handleLogin } from "../../utils/handleLogin";

jest.mock("axios");
jest.mock("../../utils/getUserIp");

describe("handleLogin", () => {
  const navigate = jest.fn();
  const setErrorMessage = jest.fn();
  const e = {
    preventDefault: jest.fn(),
  } as unknown as FormEvent<HTMLFormElement>;
  const loginData = { email: "john@example.com", password: "password" };
  const ip = "127.0.0.1";

  beforeEach(() => {
    (getUserIp as jest.Mock).mockResolvedValue(ip);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully log in the user", async () => {
    const mockResponse = { data: { data: "token" } };
    (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);
    (axios.patch as jest.Mock).mockResolvedValueOnce({});
    await handleLogin({ e, loginData, setErrorMessage, navigate });
    expect(axios.post).toHaveBeenCalledWith(`${SERVER_URL}/api/login`, {
      email: loginData.email,
      password: loginData.password,
    });
    expect(axios.patch).toHaveBeenCalledWith(
      `${SERVER_URL}/api/update`,
      {
        id: mockResponse.data.data,
      },
      { headers: { "header-ip": ip } }
    );
  });

  it("should handle server error", async () => {
    const errorMessage = "Error message";
    (axios.post as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: errorMessage } },
    });
    await handleLogin({ e, loginData, setErrorMessage, navigate });
    expect(setErrorMessage).toHaveBeenCalledWith(errorMessage);
  });

  it("should handle network error", async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce({});
    await handleLogin({ e, loginData, setErrorMessage, navigate });
    expect(setErrorMessage).toHaveBeenCalledWith(
      "No connection to the server. Please try again later."
    );
  });
});
