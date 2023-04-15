import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";
import { handleChangeFormInputs } from "../../utils/handleChangeFormInputs";
import { RegisterFormData } from "../../utils/types/TypeRegisterFormData";
import { validateEmail } from "../../utils/validators/validateEmail";
import { validateFullName } from "../../utils/validators/validateFullName";
import { validatePassword } from "../../utils/validators/validatePassword";
import { validateSecondPassword } from "../../utils/validators/validateSecondPassword";
import FormInput from "./FormInput";

export type RegisterFormProps = {
  registerData: RegisterFormData;
  setRegisterData: Dispatch<SetStateAction<RegisterFormData>>;
};

const RegisterForm = ({ registerData, setRegisterData }: RegisterFormProps) => {
  const handleChangeFormInputsUseCallback = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      handleChangeFormInputs({
        e,
        data: registerData,
        setData: setRegisterData,
      }),
    [registerData]
  );
  return (
    <>
      <FormInput
        textLabel={"Full Name"}
        name={"fullName"}
        type={"text"}
        value={registerData.fullName}
        onChange={handleChangeFormInputsUseCallback}
        validator={() => validateFullName(registerData.fullName)}
      />
      <FormInput
        textLabel={"Email Address"}
        name={"email"}
        type={"email"}
        value={registerData.email}
        onChange={handleChangeFormInputsUseCallback}
        validator={() => validateEmail(registerData.email)}
      />
      <FormInput
        textLabel={"Password"}
        name={"password"}
        type={"password"}
        value={registerData.password}
        onChange={handleChangeFormInputsUseCallback}
        validator={() => validatePassword(registerData.password)}
      />
      <FormInput
        textLabel={"Confirm Password"}
        name={"secondPassword"}
        type={"password"}
        value={registerData.secondPassword}
        onChange={handleChangeFormInputsUseCallback}
        validator={() =>
          validateSecondPassword(
            registerData.password,
            registerData.secondPassword
          )
        }
      />
    </>
  );
};

export default RegisterForm;
