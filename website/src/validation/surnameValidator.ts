import * as yup from "yup";

const surnameValidator = yup
  .string()
  .typeError("Surname must be a string")
  .required("Surname required");

export default surnameValidator;
