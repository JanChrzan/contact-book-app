import axios from "axios";
import Cookies from "js-cookie";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { SERVER_URL } from "../../config";
import { getUserIp } from "./getUserIp";
import { LoginFormData } from "./types/TypeLoginFormData";

type HandleLogin = {
  e: FormEvent<HTMLFormElement>;
  loginData: LoginFormData;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  navigate: (path: string) => void;
};
export const handleLogin = async ({
  e,
  loginData,
  setErrorMessage,
  navigate,
}: HandleLogin) => {
  e.preventDefault();
  const ip = await getUserIp();
  try {
    const response = await axios.post(`${SERVER_URL}/api/login`, {
      email: loginData.email,
      password: loginData.password,
    });
    await axios.patch(
      `${SERVER_URL}/api/update`,
      {
        id: response.data.data,
      },
      { headers: { "header-ip": ip } }
    );
    Cookies.set("token", response.data.data);
    navigate("/app");
  } catch (err: any) {
    console.log(err);
    if (err.response) {
      setErrorMessage(err.response.data.message);
    } else {
      setErrorMessage("No connection to the server. Please try again later.");
    }
  }
};
