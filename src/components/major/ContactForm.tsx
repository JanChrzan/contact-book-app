import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { handleChangeFormInputs } from "../../utils/handleChangeFormInputs";
import { handleFirstNameAndLastNameInput } from "../../utils/handleFirstNameAndLastNameInput";
import { ContactData } from "../../utils/types/TypeContactData";
import { validateEmail } from "../../utils/validators/validateEmail";
import { validateFullName } from "../../utils/validators/validateFullName";
import { validateInputLength } from "../../utils/validators/validateInputLength";
import { validatePhoneNumber } from "../../utils/validators/validatePhoneNumber";
import FormInput from "../minor/FormInput";

export type AddContactProps = {
  data: ContactData;
  setData:
    | Dispatch<SetStateAction<ContactData>>
    | Dispatch<SetStateAction<ContactData | null>>;
};

const ContactForm = ({ data, setData }: AddContactProps) => {
  const { fullName } = data;
  const [firstName, setFirstName] = useState<string>(
    fullName.split(" ")[0] || ""
  );
  const [lastName, setLastName] = useState<string>(
    fullName.split(" ")[1] || ""
  );

  const handleFirstNameAndLastNameInputUseCallback = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      handleFirstNameAndLastNameInput({
        e,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        data,
        setData,
      }),
    [firstName, lastName, data]
  );

  const handleChangeFormInputsUseCallback = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      handleChangeFormInputs({ e, data, setData }),
    [data]
  );

  useEffect(() => {
    if (fullName === "") {
      setFirstName("");
      setLastName("");
    }
  }, [fullName]);

  return (
    <div className="w-full">
      <div className="flex w-full flex-col sm:flex-row sm:gap-3">
        <FormInput
          textLabel={"First name"}
          name={"First"}
          type={"text"}
          value={firstName}
          onChange={handleFirstNameAndLastNameInputUseCallback}
          validator={() => validateFullName(firstName)}
        />
        <FormInput
          textLabel={"Last name"}
          name={"Last"}
          type={"text"}
          value={lastName}
          onChange={handleFirstNameAndLastNameInputUseCallback}
          validator={() => validateFullName(lastName)}
        />
      </div>
      <div className="flex w-full flex-col sm:flex-row sm:gap-3">
        <FormInput
          textLabel={"Email"}
          name={"email"}
          type={"email"}
          value={data.email}
          onChange={handleChangeFormInputsUseCallback}
          validator={() => validateEmail(data.email)}
        />
        <FormInput
          textLabel={"Number"}
          name={"phoneNumber"}
          type={"tel"}
          value={data.phoneNumber}
          onChange={handleChangeFormInputsUseCallback}
          validator={() => validatePhoneNumber(data.phoneNumber)}
        />
      </div>
      <div className="flex flex-col">
        <FormInput
          textLabel={"Address"}
          name={"address"}
          type={"text"}
          value={data.address}
          onChange={handleChangeFormInputsUseCallback}
          validator={() => validateInputLength(data.address)}
        />
        <FormInput
          textLabel={"Notes"}
          name={"notes"}
          type={"text"}
          value={data.notes}
          onChange={handleChangeFormInputsUseCallback}
          validator={() => validateInputLength(data.notes)}
        />
      </div>
    </div>
  );
};

export default ContactForm;
