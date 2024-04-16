import "express-async-errors";
import express, { Application, json } from "express";
import helmet from "helmet";
import { GlobalErrors } from "./errors/GlobalErrors";
import { userRouter } from "./routes/user.router";
import { sessionRouter } from "./routes/session.router";
import { taskRouter } from "./routes/task.router";


const cors = require("cors");

const app: Application = express();
app.use(cors());
app.use(helmet());
app.use(json());

const globalErrors = new GlobalErrors();
app.use("/users", userRouter);
app.use("/login", sessionRouter);
app.use("/tasks", taskRouter);

app.use(globalErrors.handleErrors);

export default app;