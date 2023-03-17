import axios from "axios";
import Cookies from "js-cookie";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { SERVER_URL } from "../../config";
import ContactContainer from "../components/major/ContactContainer";
import ContactSubmission from "../components/major/ContactSubmission";
import { ContactData } from "../utils/types/TypeContactData";

type MainProps = {
  showHomePage: boolean;
  setShowHomePage: Dispatch<SetStateAction<boolean>>;
  contacts: ContactData[];
  setContacts: Dispatch<SetStateAction<ContactData[]>>;
  searchValue: string;
};
const MainPage: FC<MainProps> = ({
  showHomePage,
  setShowHomePage,
  contacts,
  setContacts,
  searchValue,
}) => {
  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/contact/${Cookies.get("token")}`
        );
        setContacts(response.data);
      } catch (err: any) {
        console.log(err);
      }
    };

    getContacts();
  }, []);

  return showHomePage ? (
    contacts.length > 0 ? (
      <ContactContainer
        contacts={contacts}
        setContacts={setContacts}
        searchValue={searchValue}
      />
    ) : null
  ) : (
    <ContactSubmission
      contacts={contacts}
      setContacts={setContacts}
      setShowHomePage={setShowHomePage}
    />
  );
};

export default MainPage;
