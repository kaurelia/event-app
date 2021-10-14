import {
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import EventPage from "~root/pages/Event";
import { format } from "date-fns";

const correctEvent = {
  name: "Test",
  surname: "Test",
  date: "01/01/2099 00:00",
  email: "test@test.com",
};

const badEvent = {
  name: "Test",
  surname: "Test",
  date: "391237nakj#",
  email: "test",
};

afterEach(cleanup);

describe("event", () => {
  it("first name input rendering properly", () => {
    render(<EventPage />);

    const firstNameEl = screen.getByTestId("first-name-input");
    expect(firstNameEl).toBeInTheDocument();
  });

  it("surname input rendering properly", () => {
    render(<EventPage />);

    const surnameEl = screen.getByTestId("surname-input");
    expect(surnameEl).toBeInTheDocument();
  });
  it("email input rendering properly", () => {
    render(<EventPage />);

    const emailEl = screen.getByTestId("email-input");
    expect(emailEl).toBeInTheDocument();
  });
  it("date input rendering properly", () => {
    render(<EventPage />);

    const dateEl = screen.getByTestId("date-input");
    expect(dateEl).toBeInTheDocument();
  });

  it("onChange in first name input works properly", () => {
    render(<EventPage />);

    const firstNameEl: HTMLInputElement =
      screen.getByTestId("first-name-input");
    fireEvent.change(firstNameEl, { target: { value: correctEvent.name } });
    expect(firstNameEl.value).toBe(correctEvent.name);
  });

  it("onChange in surname input works properly", () => {
    render(<EventPage />);

    const surnameEl: HTMLInputElement = screen.getByTestId("surname-input");
    fireEvent.change(surnameEl, { target: { value: correctEvent.surname } });
    expect(surnameEl.value).toBe(correctEvent.surname);
  });

  it("onChange in email input works properly", () => {
    render(<EventPage />);

    const emailEl: HTMLInputElement = screen.getByTestId("email-input");
    fireEvent.change(emailEl, { target: { value: correctEvent.email } });
    expect(emailEl.value).toBe(correctEvent.email);
  });

  it("onChange in date input works properly", async () => {
    render(<EventPage />);

    const dateEl: HTMLInputElement = screen.getByTestId("date-input");
    fireEvent.change(dateEl, { target: { value: correctEvent.date } });

    setTimeout(async () => {
      await waitFor(async () => {
        expect(dateEl.value).toBe(correctEvent.date);
      });
    }, 4000);
  });

  it("send button is disabled", () => {
    render(<EventPage />);

    const firstNameEl: HTMLInputElement =
      screen.getByTestId("first-name-input");
    fireEvent.change(firstNameEl, { target: { value: correctEvent.name } });

    const surnameEl: HTMLInputElement = screen.getByTestId("surname-input");
    fireEvent.change(surnameEl, { target: { value: correctEvent.surname } });

    const emailEl: HTMLInputElement = screen.getByTestId("email-input");
    fireEvent.change(emailEl, { target: { value: correctEvent.email } });

    const sendEventButton: HTMLInputElement =
      screen.getByTestId("send-event-button");
    expect(sendEventButton).toHaveAttribute("disabled");
  });

  it("send button is enabled", () => {
    render(<EventPage />);

    const firstNameEl: HTMLInputElement =
      screen.getByTestId("first-name-input");
    fireEvent.change(firstNameEl, { target: { value: correctEvent.name } });

    const surnameEl: HTMLInputElement = screen.getByTestId("surname-input");
    fireEvent.change(surnameEl, { target: { value: correctEvent.surname } });

    const emailEl: HTMLInputElement = screen.getByTestId("email-input");
    fireEvent.change(emailEl, { target: { value: correctEvent.email } });

    const dateEl: HTMLInputElement = screen.getByTestId("date-input");
    fireEvent.change(dateEl, { target: { value: correctEvent.date } });
    setTimeout(() => {
      const sendEventButton: HTMLInputElement =
        screen.getByTestId("send-event-button");
      expect(sendEventButton).toHaveAttribute("disabled", undefined);
    }, 1000);
  });

  it("input first name invalid", async () => {
    render(<EventPage />);

    const firstNameEl: HTMLInputElement =
      screen.getByTestId("first-name-input");

    fireEvent.change(firstNameEl, { target: { value: correctEvent.name } });
    fireEvent.change(firstNameEl, { target: { value: "" } });

    await waitFor(async () => {
      expect(await screen.getByText("Name required")).toBeInTheDocument();
    });
  });

  it("input surname invalid", async () => {
    render(<EventPage />);

    const surnameEl = screen.getByTestId("surname-input");

    fireEvent.change(surnameEl, { target: { value: correctEvent.surname } });
    fireEvent.change(surnameEl, { target: { value: "" } });

    await waitFor(async () => {
      expect(await screen.getByText("Surname required")).toBeInTheDocument();
    });
  });

  it("input email invalid", async () => {
    render(<EventPage />);

    const emailEl = screen.getByTestId("email-input");

    fireEvent.change(emailEl, { target: { value: correctEvent.email } });
    fireEvent.change(emailEl, { target: { value: "" } });

    await waitFor(async () => {
      expect(await screen.getByText("Email required")).toBeInTheDocument();
    });

    fireEvent.change(emailEl, { target: { value: badEvent.email } });

    await waitFor(async () => {
      expect(await screen.getByText("Invalid email")).toBeInTheDocument();
    });
  });
  it("input date invalid", async () => {
    render(<EventPage />);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateEl: HTMLInputElement = screen.getByTestId("date-input");

    fireEvent.change(dateEl, { target: { value: badEvent.date } });

    await waitFor(async () => {
      expect(await screen.getByText("Date must be a date")).toBeInTheDocument();
    });

    fireEvent.change(dateEl, {
      target: {
        value: format(yesterday, "dd/MM/yyyy HH:mm"),
      },
    });

    await waitFor(async () => {
      expect(
        await screen.getByText("Date can't be past date"),
      ).toBeInTheDocument();
    });
  });
});
