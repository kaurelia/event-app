import eventValidator from "~root/validation/eventValidator";
import { Response, Request } from "express";
import Event from "~root/types/event";
import addEventRepo from "~root/repository/addEvent";
import { ValidationError } from "yup";
import { parseISO } from "date-fns";

const addEvent = async (request: Request, response: Response) => {
  const { name, surname, email, date: dateAsString }: Event = request.body;
  let date: Date;
  try {
    date = parseISO(dateAsString as string);
    await eventValidator.validate(
      { name, surname, email, date },
      { abortEarly: false, strict: true },
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      response
        .header("application/json")
        .status(400)
        .send({ error: error.errors });
      return;
    }
    response.header("application/json").sendStatus(500);
    return;
  }

  try {
    await addEventRepo({ name, surname, email, date });
  } catch (error) {
    response.header("application/json").sendStatus(500);
    return;
  }
  response.header("application/json").status(201).json({ msg: "Success" });
};

export default addEvent;
