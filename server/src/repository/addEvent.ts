import { Response, Request } from "express";
import { database } from "~root/index";
import Event from "~root/types/event";
import eventValidator from "~root/validation/eventValidator";
import { parseISO, format, parse } from "date-fns";

const addEventRepo = async (
  dateAsString: string,
  name: string,
  email: string,
  surname: string,
) => {
  const date = parseISO(dateAsString);
  await database.event.create({ data: { name, surname, email, date } });
};

export default addEventRepo;
