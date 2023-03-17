import { Dispatch, FC, SetStateAction } from "react";
import { handleButtonClick } from "../../utils/handleButtonClick";

type NavbarButtonProps = {
  text: string;
  state?: boolean;
  onClick?: () => void;
  setState?: Dispatch<SetStateAction<boolean>>;
};

const NavbarButton: FC<NavbarButtonProps> = ({
  text,
  state,
  onClick,
  setState,
}) => {
  return (
    <button
      className={`rounded py-2 px-4 text-white ${
        onClick
          ? "bg-rose-600 duration-150 hover:bg-rose-800"
          : state
          ? "bg-rose-600"
          : "duration-150 hover:bg-gray-700"
      }`}
      onClick={() => handleButtonClick({ onClick, setState, text })}
    >
      {text}
    </button>
  );
};

export default NavbarButton;
