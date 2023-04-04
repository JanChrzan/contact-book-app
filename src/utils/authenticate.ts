import axios from "axios";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { SERVER_URL } from "../../config";
import { getUserIp } from "./getUserIp";

type AuthenticateProps = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setAuthorized: Dispatch<SetStateAction<string>>;
  navigate: (path: string) => void;
};
export const authenticate = async ({
  setIsLoading,
  setAuthorized,
  navigate,
}: AuthenticateProps): Promise<void> => {
  const ip = await getUserIp();
  if (Cookies.get("token") === undefined) {
    setIsLoading(false);
    return;
  }
  try {
    const response = await axios.post(
      `${SERVER_URL}/api/auth`,
      {
        id: Cookies.get("token"),
      },
      {
        headers: { "header-ip": ip },
      }
    );
    const token = response.data.data;
    if (token !== undefined && token !== null) {
      setAuthorized(token);
    }
    navigate("/app");
    setIsLoading(false);
  } catch {
    Cookies.remove("token");
    setIsLoading(false);
  }
};
