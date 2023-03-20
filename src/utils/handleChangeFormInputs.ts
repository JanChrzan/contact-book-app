import { ChangeEvent } from "react";

type FormData = Record<string, string>;

type HandleChangeFormInputsProps<T extends FormData> = {
  e: ChangeEvent<HTMLInputElement>;
  data: T;
  setData: (data: T) => void;
};

export const handleChangeFormInputs = <T extends FormData>({
  e,
  data,
  setData,
}: HandleChangeFormInputsProps<T>) => {
  setData({
    ...data,
    [e.target.name]: e.target.value,
  });
};
