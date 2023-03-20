import { ChangeEvent, Dispatch, FC, SetStateAction, useCallback } from "react";
import { handleChangeFormInputs } from "../../utils/handleChangeFormInputs";
import { LoginFormData } from "../../utils/types/TypeLoginFormData";
import { validateEmail } from "../../utils/validators/validateEmail";
import { validatePassword } from "../../utils/validators/validatePassword";
import FormInput from "./FormInput";

export type LoginFormProps = {
  loginData: LoginFormData;
  setLoginData: Dispatch<SetStateAction<LoginFormData>>;
};

const LoginForm: FC<LoginFormProps> = ({ loginData, setLoginData }) => {
  const handleChangeFormInputsUseCallback = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      handleChangeFormInputs({ e, data: loginData, setData: setLoginData }),
    [loginData]
  );

  return (
    <>
      <FormInput
        textLabel={"Email Address"}
        name={"email"}
        type={"email"}
        value={loginData.email}
        onChange={handleChangeFormInputsUseCallback}
        validator={() => validateEmail(loginData.email)}
      />
      <FormInput
        textLabel={"Password"}
        name={"password"}
        type={"password"}
        value={loginData.password}
        onChange={handleChangeFormInputsUseCallback}
        validator={() => validatePassword(loginData.password)}
      />
    </>
  );
};

export default LoginForm;
