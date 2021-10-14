import TextField from "@mui/material/TextField";
import Box from "~root/component/Box";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Container from "~root/component/Container";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import addEvent from "~root/eventApi/addEvent";
import nameValidator from "~root/validation/nameValidator";
import surnameValidator from "~root/validation/surnameValidator";
import emailValidator from "~root/validation/emialValidator";
import { ValidationError } from "yup";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import dateValidator from "~root/validation/dateValidation";
import { parse } from "date-fns";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Event = () => {
  const [date, setDate] = useState<Date | null | string>(null);
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
    null,
  );

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(
    null,
  );

  const [displayToastType, setDisplayToastType] = useState<
    null | "error" | "success"
  >(null);
  const [displayToast, setDisplayToast] = useState(false);

  const closeAlert = () => {
    setDisplayToast(false);
  };

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
              <DateTimePicker
                label="DateTime picker"
                value={date}
                disablePast
                minDateTime={new Date()}
                onChange={(newDate) => {
                  setIsDateValid(true);
                  setDateErrorMessage(null);
                  setDate(newDate);
                }}
                inputFormat="dd/MM/yyyy HH:mm"
                renderInput={(params) => {
                  const inputProps = {
                    ...params.inputProps,
                    "data-testid": "date-input",
                  };
                  return (
                    <TextField
                      {...params}
                      helperText={dateErrorMessage}
                      error={!isDateValid}
                      inputProps={inputProps}
                      onChange={async (event) => {
                        try {
                          const date = parse(
                            event.target.value,
                            "dd/MM/yyyy HH:mm",
                            new Date(),
                          );
                          if (event.target.value) {
                            await dateValidator.validate(date, {
                              strict: true,
                            });
                          }
                          setIsDateValid(true);
                          setDateErrorMessage(null);
                        } catch (error) {
                          setIsDateValid(false);
                          if (error instanceof ValidationError) {
                            setDateErrorMessage(error.message);
                          }
                        }
                      }}
                    />
                  );
                }}
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
              data-testid={"send-event-button"}
              onClick={async () => {
                try {
                  const response = await addEvent({
                    name: firstName,
                    surname: surname,
                    date: date as Date,
                    email: email,
                  });
                  if ((await response).ok) {
                    setDisplayToastType("success");
                  } else {
                    setDisplayToastType("error");
                  }
                } catch (e) {
                  setDisplayToastType("error");
                } finally {
                  setDisplayToast(true);
                }
              }}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Stack>
        </Box>
      </Container>
      <Snackbar
        open={displayToast}
        autoHideDuration={6000}
        onClose={closeAlert}
      >
        <MuiAlert
          variant="filled"
          onClose={closeAlert}
          severity={displayToastType as "error" | "success"}
          sx={{ width: "100%" }}
        >
          {displayToastType === "success" ? "Added event" : "Error"}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default Event;
