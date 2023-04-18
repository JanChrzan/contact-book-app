import clsx from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ActionButton from "../components/minor/ActionButton";
import ErrorMessage from "../components/minor/ErrorMessage";
import LoginForm from "../components/minor/LoginForm";
import RegisterForm from "../components/minor/RegisterForm";
import Title from "../components/minor/Title";
import { handleDisableLoginButton } from "../utils/handleDisableLoginButton";
import { handleLogin } from "../utils/handleLogin";
import { handleRegister } from "../utils/handleRegister";
import { handleDisableRegisterButton } from "../utils/handleDisableRegisterButton";
import { LoginFormData } from "../utils/types/TypeLoginFormData";
import { RegisterFormData } from "../utils/types/TypeRegisterFormData";

type RegisterProps = {
  showLoginForm: boolean;
};

const LoginPage = ({ showLoginForm }: RegisterProps) => {
  const [registerData, setRegisterData] = useState<RegisterFormData>({
    id: uuidv4(),
    fullName: "",
    email: "",
    password: "",
    secondPassword: "",
  });
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setErrorMessage("");
  }, [showLoginForm]);

  return (
    <>
      <div
        className={clsx(
          isRegister ? "hidden" : "block",
          "absolute m-2 flex max-h-[90%] w-11/12 flex-col rounded-2xl bg-Oxford-Blue px-5 py-4 sm:w-96"
        )}
      >
        <Title text={showLoginForm ? "Welcome" : "Create account"} />
        <form
          onSubmit={(e) => {
            showLoginForm
              ? handleLogin({ e, loginData, setErrorMessage, navigate })
              : handleRegister({
                  e,
                  registerData,
                  setRegisterData,
                  setErrorMessage,
                  setIsRegister,
                  navigate,
                });
          }}
          className="my-auto flex flex-col items-center justify-between overflow-auto px-1 py-2 sm:py-4"
        >
          {showLoginForm ? (
            <LoginForm loginData={loginData} setLoginData={setLoginData} />
          ) : (
            <RegisterForm
              registerData={registerData}
              setRegisterData={setRegisterData}
            />
          )}
          <ErrorMessage errorMessage={errorMessage} />
          {showLoginForm ? (
            <ActionButton
              text={"Sign in"}
              disableStateButton={handleDisableLoginButton(loginData)}
              color={"green"}
            />
          ) : (
            <ActionButton
              text={"Sign Up"}
              disableStateButton={handleDisableRegisterButton(registerData)}
              color={"green"}
            />
          )}
        </form>
      </div>
      <div
        className={clsx(
          isRegister ? "block" : "hidden",
          "my-5 p-3 text-center"
        )}
      >
        <h3 className="text-2xl font-bold text-green-500">
          Your account has been created!
        </h3>
        <p className="my-3 font-semibold text-green-500">
          You will be automatically logged in in 5 seconds...
        </p>
      </div>
    </>
  );
};

export default LoginPage;
