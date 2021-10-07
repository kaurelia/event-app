import eventValidator from "~root/validation/eventValidator";
import { Response, Request } from "express";
import Event from "~root/types/event";
import addEventRepo from "~root/repository/addEvent";
import { ValidationError } from "yup";
const addEvent = async (request: Request, response: Response) => {
  const { name, surname, email, date }: Event = request.body;
  try {
    await eventValidator.validate(
      { name, surname, email, date },
      { abortEarly: false },
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(error);
      response.status(400).send({ error: error.errors });
      return;
    }
    response.sendStatus(500);
    return;
  }

  try {
    addEventRepo(date, name, email, surname);
  } catch (error) {
    console.log(error);
    response.sendStatus(400);
    return;
  }
  response.json({ msg: "Success" });
};

export default addEvent;
