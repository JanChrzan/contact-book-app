import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";
import { ContactData } from "./types/TypeContactData";

interface handleFirstNameAndLastNameInputProps {
  firstName: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  lastName: string;
  setLastName: Dispatch<SetStateAction<string>>;
  data: ContactData;
  setData:
    | Dispatch<SetStateAction<ContactData>>
    | Dispatch<SetStateAction<ContactData | null>>;
}

export const handleFirstNameAndLastNameInput = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  data,
  setData,
}: handleFirstNameAndLastNameInputProps) => {
  const updateFullName = (firstName: string, lastName: string) => {
    const fullName = `${firstName} ${lastName}`;
    setData({ ...data, fullName });
  };

  return useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      if (e.target.name === "First") {
        setFirstName(e.target.value);
        updateFullName(e.target.value, lastName);
      } else if (e.target.name === "Last") {
        setLastName(e.target.value);
        updateFullName(firstName, e.target.value);
      }
    },
    [setFirstName, lastName, setLastName, firstName, updateFullName]
  );
};
