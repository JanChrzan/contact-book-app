import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../utils/handleLogout";
import NavbarButton from "../minor/NavbarButton";

type NavbarProps = {
  showLoginForm: boolean;
  setShowLoginForm: Dispatch<SetStateAction<boolean>>;
  showHomePage: boolean;
  setShowHomePage: Dispatch<SetStateAction<boolean>>;
  authorized: string;
  setAuthorized: Dispatch<SetStateAction<string>>;
};

const Navbar = ({
  showLoginForm,
  setShowLoginForm,
  showHomePage,
  setShowHomePage,
  authorized,
  setAuthorized,
}: NavbarProps) => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-center gap-6 bg-Oxford-Blue p-4 text-sm font-bold">
      {authorized ? (
        <>
          <NavbarButton
            text={"Home"}
            state={showHomePage}
            setState={setShowHomePage}
          />
          <NavbarButton
            text={"Add"}
            state={!showHomePage}
            setState={setShowHomePage}
          />
          <NavbarButton
            text={"Logout"}
            onClick={() => handleLogout({ setAuthorized, navigate })}
          />
        </>
      ) : (
        <>
          <NavbarButton
            text={"Login"}
            state={showLoginForm}
            setState={setShowLoginForm}
          />
          <NavbarButton
            text={"Register"}
            state={!showLoginForm}
            setState={setShowLoginForm}
          />
        </>
      )}
    </nav>
  );
};

export default Navbar;
