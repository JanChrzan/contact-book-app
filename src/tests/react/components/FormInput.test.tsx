import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import FormInput from "../../../components/minor/FormInput";

describe("FormInput components", () => {
  const onChange = jest.fn();
  const validator = jest.fn();
  const textLabel = "Email Address";
  const name = "email";
  const type = "email";
  const value = "";

  it("should render input with label", () => {
    const { getByLabelText } = render(
      <FormInput
        textLabel={textLabel}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        validator={validator}
      />
    );
    expect(getByLabelText(textLabel)).toBeInTheDocument();
  });

  it("should call onChange with updated value on change", () => {
    const { getByLabelText } = render(
      <FormInput
        textLabel={textLabel}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        validator={validator}
      />
    );
    fireEvent.change(getByLabelText(textLabel), {
      target: { value: "test@example.com" },
    });
    expect(onChange).toHaveBeenCalled();
  });

  it("should display error message on blur if validator returns error", () => {
    const errorMessage = "Invalid email address";
    const validator = jest.fn().mockReturnValue(errorMessage);
    const { getByLabelText, getByText } = render(
      <FormInput
        textLabel={textLabel}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        validator={validator}
      />
    );
    fireEvent.blur(getByLabelText(textLabel));
    expect(getByText(errorMessage)).toBeInTheDocument();
  });
});
