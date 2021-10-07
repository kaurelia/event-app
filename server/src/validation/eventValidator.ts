import * as yup from "yup";
const eventValidator = yup.object().shape({
  name: yup.string().required("Name required"),
  surname: yup.string().required("Surname required"),
  email: yup.string().required("Email required").email("Invalid email"),
  date: yup.date().required("Date required"),
});
export default eventValidator;
