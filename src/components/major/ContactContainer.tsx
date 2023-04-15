import { Dispatch, SetStateAction, useState } from "react";
import { handleContactClick } from "../../utils/handleContactClick";
import { handleContactDetailsClose } from "../../utils/handleContactDetailsClose";
import { removeSelectedContact } from "../../utils/removeSelectedContact";
import { ContactData } from "../../utils/types/TypeContactData";
import Contact from "../minor/Contact";
import Title from "../minor/Title";
import ContactDetails from "./ContactDetails";

type ContactContainerProps = {
  contacts: ContactData[];
  setContacts: Dispatch<SetStateAction<ContactData[]>>;
  searchValue: string;
};
const ContactContainer = ({
  contacts,
  setContacts,
  searchValue,
}: ContactContainerProps) => {
  const [selectedContact, setSelectedContact] = useState<ContactData | null>(
    null
  );
  const [showDetails, setShowDetails] = useState<boolean>(false);

  return (
    <div className="absolute m-2 flex h-[90%] w-11/12 flex-col rounded-2xl bg-Oxford-Blue px-5 py-4 md:w-2/3 lg:w-1/2">
      {showDetails ? (
        <ContactDetails
          contacts={contacts}
          setContacts={setContacts}
          selectedContact={selectedContact}
          setSelectedContact={setSelectedContact}
          onClose={() =>
            handleContactDetailsClose({ setShowDetails, setSelectedContact })
          }
          deleteSelectedContact={() =>
            removeSelectedContact({
              contacts,
              selectedContact,
              setContacts,
              setSelectedContact,
              setShowDetails,
            })
          }
        />
      ) : (
        <>
          <Title text={"Contacts list"} />
          <div className="flex-1 overflow-auto">
            {contacts
              .filter((contact) =>
                contact.fullName
                  .toLowerCase()
                  .startsWith(searchValue.toLowerCase())
              )
              .map((contact) => (
                <Contact
                  key={contact.id}
                  fullName={contact.fullName}
                  onClick={() =>
                    handleContactClick({
                      contact,
                      setSelectedContact,
                      setShowDetails,
                    })
                  }
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ContactContainer;
