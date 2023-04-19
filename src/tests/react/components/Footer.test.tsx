import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Footer from "../../../components/major/Footer";

describe("Footer components", () => {
  it("renders the footer text and link", () => {
    const { getByText } = render(<Footer />);
    expect(getByText("Designed & Built by Jan Chrzan")).toBeInTheDocument();
    expect(
      getByText("Designed & Built by Jan Chrzan").closest("a")
    ).toHaveAttribute("href", "https://github.com/JanChrzan");
  });
});
