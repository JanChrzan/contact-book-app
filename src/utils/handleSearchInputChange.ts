import { ChangeEvent, Dispatch, SetStateAction } from "react";

type HandleSearchInputChange = {
  e: ChangeEvent<HTMLInputElement>;
  setSearchValue: Dispatch<SetStateAction<string>>;
};
export const handleSearchInputChange = ({
  e,
  setSearchValue,
}: HandleSearchInputChange) => {
  const newSearchValue = e.target.value;
  setSearchValue(newSearchValue);
};
