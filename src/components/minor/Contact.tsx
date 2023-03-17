import { FC } from "react";

type ContactProps = {
  fullName: string;
  onClick: () => void;
};
const Contact: FC<ContactProps> = ({ fullName, onClick }) => {
  return (
    <div onClick={onClick} className="border-b border-gray-500 py-1">
      <p className="pl-2 text-white">{fullName}</p>
    </div>
  );
};

export default Contact;
