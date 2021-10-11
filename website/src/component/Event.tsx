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

const Event = () => {
  const [date, setDate] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  return (
    <>
      <Container maxWidth="sm">
        <Box>
          <Stack spacing={5}>
            <TextField
              label="First name"
              variant="standard"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <TextField
              label="Surname"
              variant="standard"
              onChange={(e) => {
                setSurname(e.target.value);
              }}
            />
            <TextField
              label="Email"
              variant="standard"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Choose date"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Button
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
