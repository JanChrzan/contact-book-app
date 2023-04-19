import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import NavbarButton from "../../../components/minor/NavbarButton";

describe("NavbarButton components", () => {
  it("calls onClick when clicked", () => {
    const onClick = jest.fn();
    const text = "Test Button";
    const { getByText } = render(
      <NavbarButton text={text} onClick={onClick} />
    );
    fireEvent.click(getByText(text));
    expect(onClick).toHaveBeenCalled();
  });

  it("calls setState when clicked", () => {
    const setState = jest.fn();
    const text = "Test Button";
    const { getByText } = render(
      <NavbarButton text={text} setState={setState} />
    );
    fireEvent.click(getByText(text));
    expect(setState).toHaveBeenCalled();
  });
});
