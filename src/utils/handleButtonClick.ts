import { Dispatch, SetStateAction } from "react";

type HandleButtonClick = {
  onClick?: () => void;
  setState?: Dispatch<SetStateAction<boolean>>;
  text: string;
};
export const handleButtonClick = ({
  onClick,
  setState,
  text,
}: HandleButtonClick) => {
  if (onClick) {
    onClick();
  }
  if (setState) {
    setState(text === "Login" || text === "Home");
  }
};
