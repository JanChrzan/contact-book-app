import { Dispatch, FC, SetStateAction } from "react";
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
  return (
    <>
      <FormInput
        textLabel={"Email Address"}
        name={"email"}
        type={"email"}
        value={loginData.email}
        onChange={handleChangeFormInputs({
          data: loginData,
          setData: setLoginData,
        })}
        validator={() => validateEmail(loginData.email)}
      />
      <FormInput
        textLabel={"Password"}
        name={"password"}
        type={"password"}
        value={loginData.password}
        onChange={handleChangeFormInputs({
          data: loginData,
          setData: setLoginData,
        })}
        validator={() => validatePassword(loginData.password)}
      />
    </>
  );
};

export default LoginForm;
