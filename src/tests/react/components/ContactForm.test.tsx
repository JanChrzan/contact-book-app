import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import ContactForm from "../../../components/major/ContactForm";
import { ContactData } from "../../../utils/types/TypeContactData";

describe("ContactForm components", () => {
  const setData = jest.fn();

  const data: ContactData = {
    id: "",
    ownerId: "",
    fullName: "John Doe",
    email: "",
    phoneNumber: "",
    address: "",
    notes: "",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form inputs with correct labels and initial values", () => {
    const { getByLabelText } = render(
      <ContactForm data={data} setData={() => {}} />
    );

    expect(getByLabelText("First name")).toHaveValue("John");
    expect(getByLabelText("Last name")).toHaveValue("Doe");
    expect(getByLabelText("Email")).toHaveValue("");
    expect(getByLabelText("Number")).toHaveValue("");
    expect(getByLabelText("Address")).toHaveValue("");
    expect(getByLabelText("Notes")).toHaveValue("");
  });

  it("updates first name when the 'First name' input changes", () => {
    const { getByLabelText } = render(
      <ContactForm data={data} setData={setData} />
    );
    const firstNameInput = getByLabelText("First name");

    fireEvent.change(firstNameInput, { target: { value: "Jane" } });

    expect(firstNameInput).toHaveValue("Jane");
  });

  it("updates last name when the 'Last name' input changes", () => {
    const { getByLabelText } = render(
      <ContactForm data={data} setData={setData} />
    );
    const lastNameInput = getByLabelText("Last name");

    fireEvent.change(lastNameInput, { target: { value: "Smith" } });

    expect(lastNameInput).toHaveValue("Smith");
  });

  it("updates email when the 'Email' input changes", () => {
    const { getByLabelText } = render(
      <ContactForm data={data} setData={setData} />
    );
    const emailInput = getByLabelText("Email");

    fireEvent.change(emailInput, { target: { value: "john@example.com" } });

    expect(setData).toHaveBeenCalledWith({
      ...data,
      email: "john@example.com",
    });
  });

  it("updates phone number when the 'Number' input changes", () => {
    const { getByLabelText } = render(
      <ContactForm data={data} setData={setData} />
    );
    const phoneNumberInput = getByLabelText("Number");

    fireEvent.change(phoneNumberInput, { target: { value: "1234567890" } });

    expect(setData).toHaveBeenCalledWith({
      ...data,
      phoneNumber: "1234567890",
    });
  });

  it("updates address when the 'Address' input changes", () => {
    const { getByLabelText } = render(
      <ContactForm data={data} setData={setData} />
    );
    const addressInput = getByLabelText("Address");

    fireEvent.change(addressInput, { target: { value: "Street" } });

    expect(setData).toHaveBeenCalledWith({
      ...data,
      address: "Street",
    });
  });

  it("updates address when the 'Notes' input changes", () => {
    const { getByLabelText } = render(
      <ContactForm data={data} setData={setData} />
    );
    const addressInput = getByLabelText("Notes");

    fireEvent.change(addressInput, { target: { value: "notes" } });

    expect(setData).toHaveBeenCalledWith({
      ...data,
      notes: "notes",
    });
  });
});
