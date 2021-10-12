import * as yup from "yup";

const dateValidator = yup
  .date()
  .required("Date required")
  .typeError("Date must be a date");

export default dateValidator;
