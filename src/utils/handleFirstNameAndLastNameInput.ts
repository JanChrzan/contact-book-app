import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { ContactData } from "./types/TypeContactData";

interface handleFirstNameAndLastNameInputProps {
  e: ChangeEvent<HTMLInputElement>;
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
  e,
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

  if (e.target.name === "First") {
    setFirstName(e.target.value);
    updateFullName(e.target.value, lastName);
  } else if (e.target.name === "Last") {
    setLastName(e.target.value);
    updateFullName(firstName, e.target.value);
  }
};
