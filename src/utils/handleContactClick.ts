import { Dispatch, SetStateAction } from "react";
import { ContactData } from "./types/TypeContactData";

type HandleContactClickProps = {
  contact: ContactData;
  setSelectedContact: Dispatch<SetStateAction<ContactData | null>>;
  setShowDetails: Dispatch<SetStateAction<boolean>>;
};

export const handleContactClick = ({
  contact,
  setSelectedContact,
  setShowDetails,
}: HandleContactClickProps) => {
  setSelectedContact(contact);
  setShowDetails(true);
};
