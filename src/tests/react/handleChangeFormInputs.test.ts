import { handleChangeFormInputs } from "../../utils/handleChangeFormInputs";

describe("handleChangeFormInputs", () => {
  it("updates the form data when an input changes", () => {
    const setData = jest.fn();
    const data = { name: "", email: "" };
    const e = {
      target: { name: "name", value: "John Doe" },
    } as any;

    handleChangeFormInputs({ e, data, setData });

    expect(setData).toHaveBeenCalledWith({ name: "John Doe", email: "" });
  });
});
