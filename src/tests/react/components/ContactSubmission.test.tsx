import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import ContactSubmission from "../../../components/major/ContactSubmission";
import { ContactData } from "../../../utils/types/TypeContactData";

describe("ContactSubmission components", () => {
  const setContacts = jest.fn();
  const setShowHomePage = jest.fn();
  const contacts: ContactData[] = [];

  beforeEach(() => {
    render(
      <ContactSubmission
        contacts={contacts}
        setContacts={setContacts}
        setShowHomePage={setShowHomePage}
      />
    );
  });

  it("renders the form inputs", () => {
    expect(screen.getByLabelText("First name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last name")).toBeInTheDocument();
    expect(screen.getByLabelText("Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Notes")).toBeInTheDocument();
  });

  it("renders the add contact button", () => {
    expect(screen.getByText("Add contact")).toBeInTheDocument();
  });

  it("disables the add contact button when the form is not filled out", () => {
    expect(screen.getByText("Add contact")).toBeDisabled();
  });

  it("enables the add contact button when the form is filled out", () => {
    fireEvent.change(screen.getByLabelText("First name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Address"), {
      target: { value: "Street" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Number"), {
      target: { value: "123456789" },
    });
    expect(screen.getByText("Add contact")).not.toBeDisabled();
  });
});
