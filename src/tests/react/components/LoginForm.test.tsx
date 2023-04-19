import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import LoginForm from "../../../components/minor/LoginForm";

describe("LoginForm components", () => {
  const setLoginData = jest.fn();
  const loginData = { email: "", password: "" };

  it("should render email and password inputs", () => {
    const { getByLabelText } = render(
      <LoginForm loginData={loginData} setLoginData={setLoginData} />
    );
    expect(getByLabelText("Email Address")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
  });

  it("should call setLoginData with updated email value on change", () => {
    const { getByLabelText } = render(
      <LoginForm loginData={loginData} setLoginData={setLoginData} />
    );
    fireEvent.change(getByLabelText("Email Address"), {
      target: { value: "john@example.com" },
    });
    expect(setLoginData).toHaveBeenCalledWith({
      ...loginData,
      email: "john@example.com",
    });
  });

  it("should call setLoginData with updated password value on change", () => {
    const { getByLabelText } = render(
      <LoginForm loginData={loginData} setLoginData={setLoginData} />
    );
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "password" },
    });
    expect(setLoginData).toHaveBeenCalledWith({
      ...loginData,
      password: "password",
    });
  });
});
