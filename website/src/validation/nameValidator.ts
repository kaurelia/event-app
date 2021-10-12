import * as yup from "yup";

const nameValidator = yup
  .string()
  .typeError("Name must be a string")
  .required("Name required");

export default nameValidator;
