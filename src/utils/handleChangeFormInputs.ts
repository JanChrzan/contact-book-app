import { ChangeEvent, useCallback } from "react";

type FormData = Record<string, string>;

type HandleChangeFormInputsProps<T extends FormData> = {
  data: T;
  setData: (data: T) => void;
};

export const handleChangeFormInputs = <T extends FormData>({
  data,
  setData,
}: HandleChangeFormInputsProps<T>) =>
  useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    },
    [data]
  );
