import clsx from "clsx";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { handleCancelChanges } from "../../utils/handleCancelChanges";
import { handleDisableAddButton } from "../../utils/handleDisableAddButton";
import { handleSaveChanges } from "../../utils/handleSaveChanges";
import { ContactData } from "../../utils/types/TypeContactData";
import ActionButton from "../minor/ActionButton";
import ContactForm from "./ContactForm";
import ContactSection from "../minor/ContactSection";
import Title from "../minor/Title";

type ContactDetailsProps = {
  contacts: ContactData[];
  setContacts: Dispatch<SetStateAction<ContactData[]>>;
  selectedContact: ContactData | null;
  setSelectedContact: Dispatch<SetStateAction<ContactData | null>>;
  onClose: () => void;
  deleteSelectedContact: () => void;
};

const ContactDetails = ({
  contacts,
  setContacts,
  selectedContact,
  setSelectedContact,
  onClose,
  deleteSelectedContact,
}: ContactDetailsProps) => {
  if (selectedContact === null || setSelectedContact === null) return null;
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [disableSaveButton, setDisableSaveButton] = useState<boolean>(true);
  const [copySelectedContact, setCopySelectedContact] =
    useState<ContactData>(selectedContact);

  useEffect(() => {
    if (isEditable && disableSaveButton) {
      setDisableSaveButton(false);
    } else if (!isEditable && !disableSaveButton) {
      setDisableSaveButton(true);
    }
  }, [copySelectedContact, selectedContact]);

  return (
    <div className="flex h-full w-full flex-col break-words bg-Oxford-Blue text-white">
      {isEditable && <Title text={"Edit contact"} />}
      <form
        onSubmit={(e) =>
          handleSaveChanges({
            e,
            contacts,
            selectedContact,
            copySelectedContact,
            setIsEditable,
            setContacts,
            setSelectedContact,
          })
        }
        className={clsx(
          !isEditable && "flex-1 sm:justify-evenly",
          "my-auto flex flex-col items-center justify-between overflow-auto px-1 py-2 sm:py-4"
        )}
      >
        {!isEditable && (
          <h2 className="mb-2 break-all text-2xl font-bold sm:text-4xl">
            {selectedContact.fullName}
          </h2>
        )}
        <div className="w-full">
          <div className="flex flex-col gap-4">
            {!isEditable ? (
              <>
                <ContactSection
                  label="Email"
                  value={
                    <a href={`mailto:${selectedContact.email}`}>
                      {selectedContact.email}
                    </a>
                  }
                />
                <ContactSection
                  label="Number"
                  value={selectedContact.phoneNumber}
                />
                <ContactSection
                  label="Address"
                  value={selectedContact.address}
                />
                <ContactSection label="Notes" value={selectedContact.notes} />
              </>
            ) : (
              <ContactForm
                data={copySelectedContact}
                setData={setCopySelectedContact}
              />
            )}
          </div>
        </div>
        <div className="flex w-full justify-center gap-2 sm:gap-8">
          {!isEditable ? (
            <>
              <ActionButton
                text={"Edit"}
                onClick={() => setIsEditable(true)}
                color={"green"}
              />
              <ActionButton text={"Close"} onClick={onClose} color={"red"} />
            </>
          ) : (
            <>
              <ActionButton
                text={"Save"}
                color={"green"}
                disableStateButton={
                  handleDisableAddButton(copySelectedContact) ||
                  disableSaveButton
                }
              />
              <ActionButton
                text={"Delete"}
                onClick={() => deleteSelectedContact()}
                color={"red"}
              />
              <ActionButton
                text={"Close"}
                onClick={() =>
                  handleCancelChanges({
                    setCopySelectedContact,
                    selectedContact,
                    setIsEditable,
                  })
                }
                color={"red"}
              />
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactDetails;
