import clsx from "clsx";

type ActionButtonProps = {
  text: string;
  disableStateButton?: boolean;
  onClick?: () => void;
  color: string;
};

const ActionButton = ({
  text,
  disableStateButton = false,
  onClick,
  color,
}: ActionButtonProps) => {
  const buttonType = onClick ? "button" : "submit";

  return (
    <button
      className={clsx(
        disableStateButton
          ? "cursor-not-allowed brightness-50"
          : "cursor-pointer",
        color === "green"
          ? !disableStateButton && "hover:bg-green-800"
          : !disableStateButton && "hover:bg-red-800",
        color === "green" ? "bg-green-700" : "bg-red-700",
        "mt-2 rounded-full px-4 py-2 text-xs text-white duration-150 sm:mt-5 sm:min-w-[100px] sm:text-base"
      )}
      type={buttonType}
      disabled={disableStateButton}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ActionButton;
