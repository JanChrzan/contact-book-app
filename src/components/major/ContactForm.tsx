import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { handleFirstNameAndLastNameInput } from "../../utils/handleFirstNameAndLastNameInput";
import { handleChangeFormInputs } from "../../utils/handleChangeFormInputs";
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

const ContactForm: FC<AddContactProps> = ({ data, setData }) => {
  const { fullName } = data;
  const [firstName, setFirstName] = useState<string>(
    fullName.split(" ")[0] || ""
  );
  const [lastName, setLastName] = useState<string>(
    fullName.split(" ")[1] || ""
  );

  useEffect(() => {
    if (fullName === "") {
      setFirstName("");
      setLastName("");
    }
  }, [fullName, setFirstName, setLastName]);

  return (
    <div className="w-full">
      <div className="flex w-full flex-col sm:flex-row sm:gap-3">
        <FormInput
          textLabel={"First name"}
          name={"First"}
          type={"text"}
          value={firstName}
          onChange={handleFirstNameAndLastNameInput({
            firstName,
            setFirstName,
            lastName,
            setLastName,
            data,
            setData,
          })}
          validator={() => validateFullName(firstName)}
        />
        <FormInput
          textLabel={"Last name"}
          name={"Last"}
          type={"text"}
          value={lastName}
          onChange={handleFirstNameAndLastNameInput({
            firstName,
            setFirstName,
            lastName,
            setLastName,
            data,
            setData,
          })}
          validator={() => validateFullName(lastName)}
        />
      </div>
      <div className="flex w-full flex-col sm:flex-row sm:gap-3">
        <FormInput
          textLabel={"Email"}
          name={"email"}
          type={"email"}
          value={data.email}
          onChange={handleChangeFormInputs({ data, setData })}
          validator={() => validateEmail(data.email)}
        />
        <FormInput
          textLabel={"Number"}
          name={"phoneNumber"}
          type={"tel"}
          value={data.phoneNumber}
          onChange={handleChangeFormInputs({ data, setData })}
          validator={() => validatePhoneNumber(data.phoneNumber)}
        />
      </div>
      <div className="flex flex-col">
        <FormInput
          textLabel={"Address"}
          name={"address"}
          type={"text"}
          value={data.address}
          onChange={handleChangeFormInputs({ data, setData })}
          validator={() => validateInputLength(data.address)}
        />
        <FormInput
          textLabel={"Notes"}
          name={"notes"}
          type={"text"}
          value={data.notes}
          onChange={handleChangeFormInputs({ data, setData })}
          validator={() => validateInputLength(data.notes)}
        />
      </div>
    </div>
  );
};

export default ContactForm;
