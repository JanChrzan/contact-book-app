import axios from "axios";
import Cookies from "js-cookie";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
import { SERVER_URL } from "../../config";
import { ContactData } from "./types/TypeContactData";

type HandleAdd = {
  contacts: ContactData[];
  setContacts: Dispatch<SetStateAction<ContactData[]>>;
  newContact: ContactData;
  setNewContact: Dispatch<SetStateAction<ContactData>>;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  setShowHomePage: Dispatch<SetStateAction<boolean>>;
};
export const addNewContact = async (
  e: FormEvent<HTMLFormElement>,
  {
    contacts,
    setContacts,
    newContact,
    setNewContact,
    setErrorMessage,
    setShowHomePage,
  }: HandleAdd
) => {
  e.preventDefault();

  try {
    await axios.post(`${SERVER_URL}/api/contact`, {
      id: newContact.id,
      ownerId: newContact.ownerId,
      fullName: newContact.fullName,
      address: newContact.address,
      email: newContact.email,
      phoneNumber: newContact.phoneNumber,
      notes: newContact.notes,
    });
    setContacts([...contacts, newContact]);
    setNewContact({
      id: uuidv4(),
      ownerId: String(Cookies.get("token")),
      fullName: "",
      address: "",
      email: "",
      phoneNumber: "",
      notes: "",
    });
    setShowHomePage(true);
    setErrorMessage("");
  } catch (err: any) {
    console.log(err);
    if (err.response) {
      setErrorMessage(err.response.data.message);
    } else {
      setErrorMessage("No connection to the server. Please try again later.");
    }
  }
};
