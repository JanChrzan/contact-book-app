import { FC } from "react";

type TitleProps = {
  text: string;
};
const Title: FC<TitleProps> = ({ text }) => {
  return (
    <>
      <h2 className="pb-4 text-center text-2xl text-white">{text}</h2>
      <div className="border-b border-gray-500" />
    </>
  );
};

export default Title;
