import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";

type HandleLogoutProps = {
  setAuthorized: Dispatch<SetStateAction<string>>;
  navigate: (path: string) => void;
};
export const handleLogout = ({
  setAuthorized,
  navigate,
}: HandleLogoutProps) => {
  Cookies.remove("token");
  setAuthorized("");
  navigate("/");
};
