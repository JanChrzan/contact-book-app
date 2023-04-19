import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import ContactDetails from "../../../components/major/ContactDetails";

describe("ContactDetails components", () => {
  const setContacts = jest.fn();
  const setSelectedContact = jest.fn();
  const onClose = jest.fn();
  const deleteSelectedContact = jest.fn();

  const contacts = [
    {
      id: "1",
      ownerId: "",
      fullName: "John Doe",
      address: "Street 1",
      email: "john@example.com",
      phoneNumber: "123456789",
      notes: "notes1",
    },
    {
      id: "2",
      ownerId: "",
      fullName: "Jane Doe",
      address: "Street 2",
      email: "jane@example.com",
      phoneNumber: "987654321",
      notes: "notes2",
    },
  ];
  it("renders correctly when selectedContact is not null", () => {
    const { getByText } = render(
      <ContactDetails
        contacts={contacts}
        setContacts={setContacts}
        selectedContact={contacts[0]}
        setSelectedContact={setSelectedContact}
        onClose={onClose}
        deleteSelectedContact={deleteSelectedContact}
      />
    );

    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("Street 1")).toBeInTheDocument();
    expect(getByText("john@example.com")).toBeInTheDocument();
    expect(getByText("123456789")).toBeInTheDocument();
    expect(getByText("notes1")).toBeInTheDocument();
  });

  it("renders correctly when selectedContact is null", () => {
    const { container } = render(
      <ContactDetails
        contacts={contacts}
        setContacts={setContacts}
        selectedContact={null}
        setSelectedContact={setSelectedContact}
        onClose={onClose}
        deleteSelectedContact={deleteSelectedContact}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it("allows to edit contact details", () => {
    const { getByText, getByLabelText } = render(
      <ContactDetails
        contacts={contacts}
        setContacts={setContacts}
        selectedContact={contacts[0]}
        setSelectedContact={setSelectedContact}
        onClose={onClose}
        deleteSelectedContact={deleteSelectedContact}
      />
    );

    fireEvent.click(getByText("Edit"));

    expect((getByLabelText("First name") as HTMLInputElement).value).toBe(
      "John"
    );
    expect((getByLabelText("Last name") as HTMLInputElement).value).toBe("Doe");
    expect((getByLabelText("Address") as HTMLInputElement).value).toBe(
      "Street 1"
    );
    expect((getByLabelText("Email") as HTMLInputElement).value).toBe(
      "john@example.com"
    );
    expect((getByLabelText("Number") as HTMLInputElement).value).toBe(
      "123456789"
    );
    expect((getByLabelText("Notes") as HTMLInputElement).value).toBe("notes1");

    fireEvent.change(getByLabelText("First name"), {
      target: { value: "Jane" },
    });
    fireEvent.change(getByLabelText("Last name"), {
      target: { value: "Smith" },
    });
    fireEvent.click(getByText("Save"));
  });

  it("allows to delete selected contact", () => {
    const { getByText } = render(
      <ContactDetails
        contacts={contacts}
        setContacts={setContacts}
        selectedContact={contacts[0]}
        setSelectedContact={setSelectedContact}
        onClose={onClose}
        deleteSelectedContact={deleteSelectedContact}
      />
    );

    fireEvent.click(getByText("Edit"));
    fireEvent.click(getByText("Delete"));

    expect(deleteSelectedContact).toHaveBeenCalled();
  });

  it("allows to close contact details", () => {
    const { getByText } = render(
      <ContactDetails
        contacts={contacts}
        setContacts={setContacts}
        selectedContact={contacts[0]}
        setSelectedContact={setSelectedContact}
        onClose={onClose}
        deleteSelectedContact={deleteSelectedContact}
      />
    );

    fireEvent.click(getByText("Close"));

    expect(onClose).toHaveBeenCalled();
  });
});
