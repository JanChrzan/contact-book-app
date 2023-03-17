import { Dispatch, FC, SetStateAction } from "react";
import { handleSearchInputChange } from "../../utils/handleSearchInputChange";

interface SearchInputProps {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}
const SearchInput: FC<SearchInputProps> = ({ searchValue, setSearchValue }) => {
  return (
    <div className="absolute mx-auto w-11/12 md:w-2/3 lg:w-1/2">
      <div className="flex h-12 w-full items-center overflow-hidden rounded-lg bg-white focus-within:shadow-lg">
        <div className="grid h-full w-12 place-items-center text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          className="h-full w-full pr-2 text-sm text-Navy outline-none placeholder:text-Navy/50"
          type="text"
          id="search"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => handleSearchInputChange({ e, setSearchValue })}
        />
      </div>
    </div>
  );
};

export default SearchInput;
