import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import RegisterForm from "../../components/minor/RegisterForm";

describe("RegisterForm component", () => {
  it("renders the form inputs", () => {
    const setRegisterData = jest.fn();
    const { getByLabelText } = render(
      <RegisterForm
        registerData={{
          id: "",
          fullName: "",
          email: "",
          password: "",
          secondPassword: "",
        }}
        setRegisterData={setRegisterData}
      />
    );
    expect(getByLabelText("Full Name")).toBeInTheDocument();
    expect(getByLabelText("Email Address")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByLabelText("Confirm Password")).toBeInTheDocument();
  });

  it("calls setRegisterData on input change", () => {
    const setRegisterData = jest.fn();
    const { getByLabelText } = render(
      <RegisterForm
        registerData={{
          id: "",
          fullName: "",
          email: "",
          password: "",
          secondPassword: "",
        }}
        setRegisterData={setRegisterData}
      />
    );
    fireEvent.change(getByLabelText("Full Name"), {
      target: { value: "test" },
    });
    expect(setRegisterData).toHaveBeenCalledWith({
      id: "",
      fullName: "test",
      email: "",
      password: "",
      secondPassword: "",
    });
  });
});
