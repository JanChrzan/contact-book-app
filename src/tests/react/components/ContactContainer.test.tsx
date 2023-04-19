import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import ContactContainer from "../../../components/major/ContactContainer";

describe("ContactContainer components", () => {
  const setContacts = jest.fn();
  const contacts = [
    {
      id: "1",
      ownerId: "",
      fullName: "John Doe",
      address: "Street 1",
      email: "john.doe@example.com",
      phoneNumber: "123-456-7890",
      notes: "notes 1",
    },
    {
      id: "2",
      ownerId: "",
      fullName: "Jane Doe",
      address: "Street 2",
      email: "jane.doe@example.com",
      phoneNumber: "098-765-4321",
      notes: "notes 2",
    },
  ];

  it("renders the contacts list", () => {
    render(
      <ContactContainer
        contacts={contacts}
        setContacts={setContacts}
        searchValue=""
      />
    );

    expect(screen.getByText("Contacts list")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  it("filters the contacts list based on the search value", () => {
    render(
      <ContactContainer
        contacts={contacts}
        setContacts={setContacts}
        searchValue="jane"
      />
    );

    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  it("opens the contact details when a contact is clicked", () => {
    render(
      <ContactContainer
        contacts={contacts}
        setContacts={jest.fn()}
        searchValue=""
      />
    );

    fireEvent.click(screen.getByText("John Doe"));
  });
});
