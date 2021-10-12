import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Box from "~root/component/Box";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Container from "~root/component/Container";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import addEvent from "~root/EventApi/EventApi";
import dateValidator from "~root/validation/dateValidation";
import nameValidator from "~root/validation/nameValidator";
import surnameValidator from "~root/validation/surnameValidator";
import emailValidator from "~root/validation/emialValidator";

import { ValidationError } from "yup";
import { parseISO } from "date-fns";

const Event = () => {
  const [date, setDate] = useState<string | null>(null);
  const [isDateValid, setIsDateValid] = useState(true);
  const [dateErrorMessage, setDateErrorMessage] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [isFirstNameValid, setIsFirstnameValid] = useState(true);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState<
    string | null
  >(null);

  const [surname, setSurname] = useState("");
  const [isSurnameValid, setIsSurnameValid] = useState(true);
  const [surnameErrorMessage, setSurnameErrorMessage] = useState<string | null>(
    null
  );

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(
    null
  );

  return (
    <>
      <Container maxWidth="sm">
        <Box>
          <Stack spacing={5}>
            <TextField
              label="First name"
              variant="standard"
              inputProps={{ "data-testid": "first-name-input" }}
              helperText={firstNameErrorMessage}
              error={!isFirstNameValid}
              onChange={async (event) => {
                setFirstName(event.target.value);
                try {
                  await nameValidator.validate(event.target.value, {
                    strict: true,
                  });
                  setIsFirstnameValid(true);
                  setFirstNameErrorMessage(null);
                } catch (error) {
                  setIsFirstnameValid(false);
                  if (error instanceof ValidationError) {
                    setFirstNameErrorMessage(error.message);
                  }
                }
              }}
            />
            <TextField
              label="Surname"
              variant="standard"
              inputProps={{ "data-testid": "surname-input" }}
              helperText={surnameErrorMessage}
              error={!isSurnameValid}
              onChange={async (event) => {
                setSurname(event.target.value);
                try {
                  await surnameValidator.validate(event.target.value, {
                    strict: true,
                  });
                  setIsSurnameValid(true);
                  setSurnameErrorMessage(null);
                } catch (error) {
                  setIsSurnameValid(false);
                  if (error instanceof ValidationError) {
                    setSurnameErrorMessage(error.message);
                  }
                }
              }}
            />
            <TextField
              label="Email"
              variant="standard"
              inputProps={{ "data-testid": "email-input" }}
              helperText={emailErrorMessage}
              error={!isEmailValid}
              onChange={async (event) => {
                setEmail(event.target.value);
                try {
                  await emailValidator.validate(event.target.value, {
                    strict: true,
                  });
                  setIsEmailValid(true);
                  setEmailErrorMessage(null);
                } catch (error) {
                  setIsEmailValid(false);
                  if (error instanceof ValidationError) {
                    setEmailErrorMessage(error.message);
                  }
                }
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Choose date"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    helperText={dateErrorMessage}
                    error={!isDateValid}
                    onChange={async (event) => {
                      try {
                        const date = parseISO(event.target.value);
                        await dateValidator.validate(date, {
                          strict: true,
                        });
                        setIsDateValid(true);
                        setDateErrorMessage(null);
                      } catch (error) {
                        setIsDateValid(false);
                        if (error instanceof ValidationError) {
                          setDateErrorMessage(error.message);
                        }
                      }
                    }}
                    inputProps={{ "data-testid": "date-input" }}
                    data-testid="date-input"
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
            <Button
              disabled={
                !(
                  isFirstNameValid &&
                  isSurnameValid &&
                  isEmailValid &&
                  isDateValid &&
                  Boolean(firstName) &&
                  Boolean(surname) &&
                  Boolean(email) &&
                  Boolean(date)
                )
              }
              onClick={() => {
                addEvent({
                  name: firstName,
                  surname: surname,
                  date: date,
                  email: email,
                });
              }}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default Event;
