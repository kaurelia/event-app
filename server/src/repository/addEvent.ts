import { database } from "~root/index";
import Event from "~root/types/event";

const addEventRepo = async ({ name, surname, email, date }: Event) => {
  await database.event.create({ data: { name, surname, email, date } });
};

export default addEventRepo;
