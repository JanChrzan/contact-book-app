type TitleProps = {
  text: string;
};
const Title = ({ text }: TitleProps) => {
  return (
    <>
      <h2 className="pb-4 text-center text-2xl text-white">{text}</h2>
      <div className="border-b border-gray-500" />
    </>
  );
};

export default Title;
