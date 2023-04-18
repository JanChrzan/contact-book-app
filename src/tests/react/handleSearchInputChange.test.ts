import { ChangeEvent } from "react";
import { handleSearchInputChange } from "../../utils/handleSearchInputChange";

describe("handleSearchInputChange", () => {
  const e: ChangeEvent<HTMLInputElement> = {
    target: { value: "new value" },
  } as ChangeEvent<HTMLInputElement>;
  const setSearchValue = jest.fn();

  it("should update search value", () => {
    handleSearchInputChange({ e, setSearchValue });

    expect(setSearchValue).toHaveBeenCalledWith("new value");
  });
});
