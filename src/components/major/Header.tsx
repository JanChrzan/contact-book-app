import { Dispatch, SetStateAction } from "react";
import headerImg from "../../assets/header.png";
import SearchInput from "../minor/SearchInput";

type HeaderProps = {
  parallaxEffectStyles: Record<string, string>;
  authorized: string;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
};

const Header = ({
  parallaxEffectStyles,
  authorized,
  searchValue,
  setSearchValue,
}: HeaderProps) => {
  return (
    <header className="flex h-[20vh] items-center justify-center overflow-hidden">
      <img
        src={headerImg}
        alt="Header img"
        style={parallaxEffectStyles}
        className="min-w-[110vw] opacity-40 blur-sm brightness-75"
      />
      {authorized ? (
        <SearchInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      ) : (
        <h1 className="absolute font-Caveat text-4xl font-bold uppercase text-white sm:text-6xl">
          Contact book
        </h1>
      )}
    </header>
  );
};

export default Header;
