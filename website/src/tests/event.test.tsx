import { render, screen, fireEvent } from "@testing-library/react";
import Event2 from "~root/component/Event";

const correctEvent = {
  name: "Test",
  surname: "Test",
  date: "2050-01-01",
  email: "test@test.com",
};

describe("event", () => {
  it("load view to add event", () => {
    render(<Event2 />);

    const firstNameEl = screen.getByTestId("first-name-input");
    expect(firstNameEl).toBeInTheDocument();

    const surnameEl = screen.getByTestId("surname-input");
    expect(surnameEl).toBeInTheDocument();

    const emailEl = screen.getByTestId("email-input");
    expect(emailEl).toBeInTheDocument();

    const dateEl = screen.getByTestId("date-input");
    expect(dateEl).toBeInTheDocument();
  });

  it("add event", () => {
    const { getByText } = render(<Event2 />);

    const firstNameEl: HTMLInputElement =
      screen.getByTestId("first-name-input");
    fireEvent.change(firstNameEl, { target: { value: correctEvent.name } });
    expect(firstNameEl.value).toBe(correctEvent.name);

    const surnameEl: HTMLInputElement = screen.getByTestId("surname-input");
    fireEvent.change(surnameEl, { target: { value: correctEvent.surname } });
    expect(surnameEl.value).toBe(correctEvent.surname);

    const emailEl: HTMLInputElement = screen.getByTestId("email-input");
    fireEvent.change(emailEl, { target: { value: correctEvent.email } });
    expect(emailEl.value).toBe(correctEvent.email);

    fireEvent.click(getByText("Send"));
  });
});
