import * as yup from "yup";

const dateValidator = yup
  .date()
  .required("Date required")
  .min(new Date(), "Date can't be past date")
  .typeError("Date must be a date");

export default dateValidator;
