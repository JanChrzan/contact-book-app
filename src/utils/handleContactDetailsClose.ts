import { Dispatch, SetStateAction } from "react";
import { ContactData } from "./types/TypeContactData";

type HandleContactDetailsCloseProps = {
  setSelectedContact: Dispatch<SetStateAction<ContactData | null>>;
  setShowDetails: Dispatch<SetStateAction<boolean>>;
};

export const handleContactDetailsClose = ({
  setSelectedContact,
  setShowDetails,
}: HandleContactDetailsCloseProps) => {
  setSelectedContact(null);
  setShowDetails(false);
};
