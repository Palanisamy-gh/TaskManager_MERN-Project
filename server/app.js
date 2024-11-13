import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import databaseConnection from "./db/databaseConnection.js";
import taskRouter from "./routes/tasks.router.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

databaseConnection();

app.use("/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
