import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import React from "react";
import Title from "../../../components/minor/Title";

describe("Title components", () => {
  it("renders the text prop", () => {
    const text = "Test Title";
    const { getByText } = render(<Title text={text} />);
    expect(getByText(text)).toBeInTheDocument();
  });
});
