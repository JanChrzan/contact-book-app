import axios from "axios";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { SERVER_URL } from "../../config";
import { ContactData } from "./types/TypeContactData";

type GetContactsProps = {
  setContacts: Dispatch<SetStateAction<ContactData[]>>;
};

export const getContacts = async ({ setContacts }: GetContactsProps) => {
  try {
    const response = await axios.get(
      `${SERVER_URL}/api/contact/${Cookies.get("token")}`
    );
    setContacts(response.data.data);
  } catch (err: any) {
    console.log(err);
  }
};
