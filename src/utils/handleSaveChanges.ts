import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { SERVER_URL } from "../../config";
import { ContactData } from "./types/TypeContactData";

type HandleSaveChangesProps = {
  contacts: ContactData[];
  selectedContact: ContactData;
  copySelectedContact: ContactData;
  setIsEditable: Dispatch<SetStateAction<boolean>>;
  setContacts: Dispatch<SetStateAction<ContactData[]>>;
  setSelectedContact: Dispatch<SetStateAction<ContactData | null>>;
};
export const handleSaveChanges = async ({
  contacts,
  selectedContact,
  copySelectedContact,
  setIsEditable,
  setContacts,
  setSelectedContact,
}: HandleSaveChangesProps) => {
  try {
    await axios.put(`${SERVER_URL}/api/contact`, copySelectedContact);
    const updatedContacts = contacts.map((contact) =>
      contact.id === selectedContact.id ? copySelectedContact : contact
    );
    setContacts(updatedContacts);
    setSelectedContact(copySelectedContact);
    setIsEditable(false);
  } catch (err: any) {
    console.error(err);
  }
};
