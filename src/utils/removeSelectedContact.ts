import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { SERVER_URL } from "../../config";
import { ContactData } from "./types/TypeContactData";

type removeSelectedContactProps = {
  contacts: ContactData[];
  setContacts: Dispatch<SetStateAction<ContactData[]>>;
  selectedContact: ContactData | null;
  setSelectedContact: Dispatch<SetStateAction<ContactData | null>>;
  setShowDetails: Dispatch<SetStateAction<boolean>>;
};

export const removeSelectedContact = async ({
  contacts,
  selectedContact,
  setContacts,
  setSelectedContact,
  setShowDetails,
}: removeSelectedContactProps) => {
  try {
    if (!selectedContact) return;
    await axios.delete(`${SERVER_URL}/api/contact/${selectedContact.id}`);
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== selectedContact.id
    );
    setContacts(updatedContacts);
    setSelectedContact(null);
    setShowDetails(false);
  } catch (err: any) {
    console.error(err);
  }
};
