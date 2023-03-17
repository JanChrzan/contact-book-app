import axios from "axios";
import Cookies from "js-cookie";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
import { SERVER_URL } from "../../config";
import { getUserIp } from "./getUserIp";
import { RegisterFormData } from "./types/TypeRegisterFormData";

type handleRegister = {
  e: FormEvent<HTMLFormElement>;
  registerData: RegisterFormData;
  setRegisterData: Dispatch<SetStateAction<RegisterFormData>>;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  setIsRegister: Dispatch<SetStateAction<boolean>>;
  navigate: (path: string) => void;
};

export const handleRegister = async ({
  e,
  registerData,
  setRegisterData,
  setErrorMessage,
  setIsRegister,
  navigate,
}: handleRegister) => {
  e.preventDefault();
  if (registerData.password !== registerData.secondPassword) return;
  const ip = await getUserIp();
  try {
    const response = await axios.post(
      `${SERVER_URL}/api/register`,
      {
        id: registerData.id,
        fullName: registerData.fullName,
        email: registerData.email,
        password: registerData.password,
      },
      {
        headers: { "header-ip": ip },
      }
    );

    Cookies.set("token", response.data);
    setRegisterData({
      id: uuidv4(),
      fullName: "",
      email: "",
      password: "",
      secondPassword: "",
    });
    setIsRegister(true);
    setTimeout(() => {
      navigate("/app");
    }, 5000);
  } catch (err: any) {
    if (err.response) {
      setErrorMessage(err.response.data.message);
    } else {
      setErrorMessage("No connection to the server. Please try again later.");
    }
  }
};
