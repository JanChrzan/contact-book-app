import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import ActionButton from "../../../components/minor/ActionButton";

describe("ActionButton components", () => {
  const text = "Submit";
  const color = "green";

  it("should render button with text", () => {
    const { getByText } = render(<ActionButton text={text} color={color} />);
    expect(getByText(text)).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <ActionButton text={text} color={color} onClick={onClick} />
    );
    fireEvent.click(getByText(text));
    expect(onClick).toHaveBeenCalled();
  });

  it("should have disabled attribute when disableStateButton is true", () => {
    const disableStateButton = true;
    const { getByText } = render(
      <ActionButton
        text={text}
        color={color}
        disableStateButton={disableStateButton}
      />
    );
    expect(getByText(text)).toBeDisabled();
  });
});
