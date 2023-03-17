import { Dispatch, SetStateAction } from "react";
import { ContactData } from "./types/TypeContactData";

type HandleCancelChangesProps = {
  setCopySelectedContact: Dispatch<SetStateAction<ContactData>>;
  selectedContact: ContactData;
  setIsEditable: Dispatch<SetStateAction<boolean>>;
};
export const handleCancelChanges = ({
  setCopySelectedContact,
  selectedContact,
  setIsEditable,
}: HandleCancelChangesProps) => {
  setCopySelectedContact(selectedContact);
  setIsEditable(false);
};
