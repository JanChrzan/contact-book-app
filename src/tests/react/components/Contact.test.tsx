import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import Contact from "../../../components/minor/Contact";

describe("Contact components", () => {
  const onClick = jest.fn();
  const fullName = "John Doe";

  it("should render full name", () => {
    const { getByText } = render(
      <Contact fullName={fullName} onClick={onClick} />
    );
    expect(getByText(fullName)).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    const { getByText } = render(
      <Contact fullName={fullName} onClick={onClick} />
    );
    fireEvent.click(getByText(fullName));
    expect(onClick).toHaveBeenCalled();
  });
});
