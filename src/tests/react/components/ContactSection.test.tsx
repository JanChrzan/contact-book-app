import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import ContactSection from "../../../components/minor/ContactSection";

describe("ContactSection components", () => {
  const label = "Email";
  const value = "john@example.com";

  it("should render label and value if value is provided", () => {
    const { getByText } = render(
      <ContactSection label={label} value={value} />
    );
    expect(
      getByText((content) => content.startsWith(label))
    ).toBeInTheDocument();
    expect(getByText(value)).toBeInTheDocument();
  });

  it("should not render if value is not provided", () => {
    const value = "";
    const { container } = render(
      <ContactSection label={label} value={value} />
    );
    expect(container).toBeEmptyDOMElement();
  });
});
