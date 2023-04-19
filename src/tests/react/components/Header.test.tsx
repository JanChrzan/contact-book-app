import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Header from "../../../components/major/Header";

describe("Header components", () => {
  const setSearchValue = jest.fn();
  const parallaxEffectStyles = {};

  it("renders search input when authorized", () => {
    const { getByPlaceholderText } = render(
      <Header
        parallaxEffectStyles={parallaxEffectStyles}
        authorized="authorized"
        searchValue=""
        setSearchValue={setSearchValue}
      />
    );
    expect(getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("renders header text when not authorized", () => {
    const { getByText } = render(
      <Header
        parallaxEffectStyles={parallaxEffectStyles}
        authorized=""
        searchValue=""
        setSearchValue={setSearchValue}
      />
    );
    expect(getByText("Contact book")).toBeInTheDocument();
  });
});
