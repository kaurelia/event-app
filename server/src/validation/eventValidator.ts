import * as yup from "yup";

const eventValidator = yup.object().shape({
  name: yup
    .string()
    .typeError("Name must be a string")
    .required("Name required"),
  surname: yup
    .string()
    .typeError("Surname must be a string")
    .required("Surname required"),
  email: yup
    .string()
    .typeError("Email must be a string")
    .required("Email required")
    .email("Invalid email"),
  date: yup.date().required("Date required").typeError("Date must be a date"),
});
export default eventValidator;
