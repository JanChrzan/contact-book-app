import Cookies from "js-cookie";
import { Dispatch, SetStateAction, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addNewContact } from "../../utils/addNewContact";
import { handleDisableAddButton } from "../../utils/handleDisableAddButton";
import { ContactData } from "../../utils/types/TypeContactData";
import ActionButton from "../minor/ActionButton";
import ContactForm from "./ContactForm";
import ErrorMessage from "../minor/ErrorMessage";
import Title from "../minor/Title";

type ContactSubmissionProps = {
  contacts: ContactData[];
  setContacts: Dispatch<SetStateAction<ContactData[]>>;
  setShowHomePage: Dispatch<SetStateAction<boolean>>;
};
const ContactSubmission = ({
  contacts,
  setContacts,
  setShowHomePage,
}: ContactSubmissionProps) => {
  const [newContact, setNewContact] = useState<ContactData>({
    id: uuidv4(),
    ownerId: String(Cookies.get("token")),
    fullName: "",
    address: "",
    email: "",
    phoneNumber: "",
    notes: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <div className="absolute m-2 flex h-[90%] w-11/12 flex-col rounded-2xl bg-Oxford-Blue px-5 py-4 xl:w-1/2">
      <Title text={"Create new contact"} />
      <form
        onSubmit={(e) =>
          addNewContact(e, {
            contacts,
            setContacts,
            newContact,
            setNewContact,
            setErrorMessage,
            setShowHomePage,
          })
        }
        className="my-auto flex flex-col items-center justify-between overflow-auto px-1 py-2 sm:py-4"
      >
        <ContactForm data={newContact} setData={setNewContact} />
        <ErrorMessage errorMessage={errorMessage} />
        <ActionButton
          text={"Add contact"}
          color={"green"}
          disableStateButton={handleDisableAddButton(newContact)}
        />
      </form>
    </div>
  );
};

export default ContactSubmission;
