import express, { json as jsonBodyParser } from "express";
import cors from "cors";

const app = express();
const port = 5001;

app.use(jsonBodyParser());
app.use(cors());

app.listen(port);
