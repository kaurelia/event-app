import * as yup from "yup";

const emailValidator = yup
  .string()
  .typeError("Email must be a string")
  .required("Email required")
  .email("Invalid email");

export default emailValidator;
