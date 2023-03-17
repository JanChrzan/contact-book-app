import { FC } from "react";

type ActionButtonProps = {
  text: string;
  disableStateButton?: boolean;
  onClick?: () => void;
  color: string;
};

const ActionButton: FC<ActionButtonProps> = ({
  text,
  disableStateButton = false,
  onClick,
  color,
}) => {
  const buttonType = onClick ? "button" : "submit";

  const buttonBackgroundColor =
    color === "green"
      ? ["bg-green-700", "hover:bg-green-800"]
      : ["bg-red-700", "hover:bg-red-800"];

  return (
    <button
      className={`${
        disableStateButton
          ? `cursor-not-allowed brightness-50`
          : `cursor-pointer ${buttonBackgroundColor[1]}`
      } mt-2 sm:mt-5 ${
        buttonBackgroundColor[0]
      } rounded-full px-4 py-2 text-xs text-white duration-150 sm:min-w-[100px] sm:text-base`}
      type={buttonType}
      disabled={disableStateButton}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ActionButton;
