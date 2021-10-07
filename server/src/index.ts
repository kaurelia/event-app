import express, { json as jsonBodyParser } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import addEvent from "./service/addEventService";

export const database = new PrismaClient();
const app = express();
const port = 5001;

app.use(jsonBodyParser());
app.use(cors());

app.post("/event", addEvent);

app.listen(port);
