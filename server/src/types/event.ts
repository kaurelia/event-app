import { Event as PrismaEvent } from "@prisma/client";

type Event = Omit<PrismaEvent, "id"> & { date: string | Date };

export default Event;
