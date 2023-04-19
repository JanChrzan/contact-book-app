import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import ErrorMessage from "../../../components/minor/ErrorMessage";

describe("ErrorMessage components", () => {
  it("should render error message if provided", () => {
    const errorMessage = "Invalid email address";
    const { getByText } = render(<ErrorMessage errorMessage={errorMessage} />);
    expect(getByText(errorMessage)).toBeInTheDocument();
  });

  it("should not render error message if not provided", () => {
    const errorMessage = "";
    const { container } = render(<ErrorMessage errorMessage={errorMessage} />);
    expect(container).toBeEmptyDOMElement();
  });
});
