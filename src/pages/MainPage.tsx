import { Dispatch, SetStateAction, useEffect } from "react";
import ContactContainer from "../components/major/ContactContainer";
import ContactSubmission from "../components/major/ContactSubmission";
import { getContacts } from "../utils/getContacts";
import { ContactData } from "../utils/types/TypeContactData";

type MainProps = {
  showHomePage: boolean;
  setShowHomePage: Dispatch<SetStateAction<boolean>>;
  contacts: ContactData[];
  setContacts: Dispatch<SetStateAction<ContactData[]>>;
  searchValue: string;
};
const MainPage = ({
  showHomePage,
  setShowHomePage,
  contacts,
  setContacts,
  searchValue,
}: MainProps) => {
  useEffect(() => {
    (async () => {
      await getContacts({ setContacts });
    })();
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
