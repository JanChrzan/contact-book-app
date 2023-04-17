import { handleButtonClick } from "../../utils/handleButtonClick";

describe("handleButtonClick", () => {
  it("calls the onClick function if provided", () => {
    const onClick = jest.fn();
    handleButtonClick({ onClick, text: "" });
    expect(onClick).toHaveBeenCalled();
  });

  it("does not call the onClick function if not provided", () => {
    const onClick = jest.fn();
    handleButtonClick({ text: "" });
    expect(onClick).not.toHaveBeenCalled();
  });

  it("sets the state to true if the button text is 'Login' or 'Home'", () => {
    const setState = jest.fn();
    handleButtonClick({ setState, text: "Login" });
    expect(setState).toHaveBeenCalledWith(true);
    setState.mockClear();
    handleButtonClick({ setState, text: "Home" });
    expect(setState).toHaveBeenCalledWith(true);
  });

  it("sets the state to false if the button text is not 'Login' or 'Home'", () => {
    const setState = jest.fn();
    handleButtonClick({ setState, text: "Logout" });
    expect(setState).toHaveBeenCalledWith(false);
  });
});
