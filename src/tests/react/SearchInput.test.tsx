import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import SearchInput from "../../components/minor/SearchInput";

describe("SearchInput component", () => {
  it("renders the search input", () => {
    const setSearchValue = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchInput searchValue="" setSearchValue={setSearchValue} />
    );
    expect(getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("calls setSearchValue on input change", () => {
    const setSearchValue = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchInput searchValue="" setSearchValue={setSearchValue} />
    );
    fireEvent.change(getByPlaceholderText("Search..."), {
      target: { value: "test" },
    });
    expect(setSearchValue).toHaveBeenCalledWith("test");
  });
});
