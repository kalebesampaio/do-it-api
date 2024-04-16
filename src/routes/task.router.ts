import { Router } from "express";
import middlewares from "../middlewares";
import { TaskControllers } from "../controllers/task.controllers";
import { taskCreateSchema } from "../schemas/task.schemas";


export const taskRouter: Router = Router();
const taskController = new TaskControllers();

taskRouter.post(
  "",
  middlewares.verifyToken,
  middlewares.validateBody(taskCreateSchema),
  taskController.create
);

taskRouter.get(
    "/:id", 
    middlewares.verifyToken, 
    middlewares.idTaskExists, 
    middlewares.taskOwner, 
    taskController.retrieve
);
taskRouter.patch(
  "/:id",
  middlewares.verifyToken,
  middlewares.idTaskExists, 
  middlewares.taskOwner,
  taskController.update
);
taskRouter.delete(
  "/:id",
  middlewares.verifyToken,
  middlewares.idTaskExists, 
  middlewares.taskOwner,
  taskController.delete
);