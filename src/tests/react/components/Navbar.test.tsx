import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../../../components/major/Navbar";

describe("Navbar components", () => {
  const setShowLoginForm = jest.fn();
  const setShowHomePage = jest.fn();
  const setAuthorized = jest.fn();

  beforeEach(() => {
    render(
      <MemoryRouter>
        <Navbar
          showLoginForm={false}
          setShowLoginForm={setShowLoginForm}
          showHomePage={false}
          setShowHomePage={setShowHomePage}
          authorized=""
          setAuthorized={setAuthorized}
        />
      </MemoryRouter>
    );
  });

  it("renders login and register buttons when not authorized", () => {
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("renders home, add and logout buttons when authorized", () => {
    render(
      <MemoryRouter>
        <Navbar
          showLoginForm={false}
          setShowLoginForm={setShowLoginForm}
          showHomePage={false}
          setShowHomePage={setShowHomePage}
          authorized="authorized"
          setAuthorized={setAuthorized}
        />
      </MemoryRouter>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("calls setShowLoginForm with true when login button is clicked", () => {
    fireEvent.click(screen.getByText("Login"));
    expect(setShowLoginForm).toHaveBeenCalledWith(true);
  });

  it("calls setShowLoginForm with false when register button is clicked", () => {
    fireEvent.click(screen.getByText("Register"));
    expect(setShowLoginForm).toHaveBeenCalledWith(false);
  });
});
