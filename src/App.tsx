import { useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import backgroundImg from "./assets/BG.svg";
import Footer from "./components/major/Footer";
import Header from "./components/major/Header";
import Navbar from "./components/major/Navbar";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import PrivateRoute from "./pages/PrivateRoute";
import { authenticate } from "./utils/authenticate";
import { handleParallaxEvent } from "./utils/handleParallaxEvent";
import { ContactData } from "./utils/types/TypeContactData";
import { MousePosition } from "./utils/types/TypeMousePosition";

const App = () => {
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [showLoginForm, setShowLoginForm] = useState<boolean>(true);
  const [showHomePage, setShowHomePage] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authorized, setAuthorized] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  const divRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const parallaxEffectStyles = {
    transform: `translate(${mousePosition.x / -40}px, ${
      mousePosition.y / 100
    }px)`,
  };

  useEffect(() => {
    (async () => {
      await authenticate({ setAuthorized, setIsLoading, navigate });
    })();
  }, [navigate]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) =>
      handleParallaxEvent({ e, setMousePosition });

    if (divRef.current) {
      divRef.current.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (divRef.current) {
        divRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [divRef]);

  return (
    <div ref={divRef} className="z-10 flex min-h-screen flex-col">
      <Header
        parallaxEffectStyles={parallaxEffectStyles}
        authorized={authorized}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <Navbar
        showLoginForm={showLoginForm}
        setShowLoginForm={setShowLoginForm}
        showHomePage={showHomePage}
        setShowHomePage={setShowHomePage}
        authorized={authorized}
        setAuthorized={setAuthorized}
      />
      <main className="relative flex flex-1 items-center justify-center">
        <img
          src={backgroundImg}
          alt="background"
          className="absolute -z-10 h-full w-full object-cover"
        />
        <Routes>
          <Route
            path="/"
            element={
              isLoading ? null : <LoginPage showLoginForm={showLoginForm} />
            }
          />
          <Route
            path="/app"
            element={
              <PrivateRoute>
                <MainPage
                  showHomePage={showHomePage}
                  setShowHomePage={setShowHomePage}
                  contacts={contacts}
                  setContacts={setContacts}
                  searchValue={searchValue}
                />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
