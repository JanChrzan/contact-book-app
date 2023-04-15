import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { handleButtonClick } from "../../utils/handleButtonClick";

type NavbarButtonProps = {
  text: string;
  state?: boolean;
  onClick?: () => void;
  setState?: Dispatch<SetStateAction<boolean>>;
};

const NavbarButton = ({
  text,
  state,
  onClick,
  setState,
}: NavbarButtonProps) => {
  return (
    <button
      className={clsx(
        onClick && "bg-rose-600 duration-150 hover:bg-rose-800",
        state
          ? !onClick && "bg-rose-600"
          : !onClick && "duration-150 hover:bg-gray-700",
        "rounded px-4 py-2 text-white"
      )}
      onClick={() => handleButtonClick({ onClick, setState, text })}
    >
      {text}
    </button>
  );
};

export default NavbarButton;
