import { ChangeEventHandler, useEffect, useState } from "react";

type FormInputProps = {
  textLabel: string;
  name: string;
  type: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  validator: (value: string, value2?: string) => string;
};
const FormInput = ({
  textLabel,
  name,
  type,
  value,
  onChange,
  validator,
}: FormInputProps) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setErrorMessage("");
  }, [value]);

  return (
    <label
      htmlFor={name}
      className="my-2 flex w-full flex-col text-xs font-bold text-white"
    >
      <span className="ml-2">{textLabel}</span>
      <input
        className="h-9 w-full appearance-none rounded-md border-2 border-white bg-white px-2 text-sm leading-tight text-Navy placeholder-Navy focus:border-Navy focus:bg-Alice-Blue focus:outline-none sm:h-10"
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={() => setErrorMessage(validator)}
      />
      {errorMessage && (
        <p className="mx-2 mt-1 text-xs text-red-500">{errorMessage}</p>
      )}
    </label>
  );
};

export default FormInput;
