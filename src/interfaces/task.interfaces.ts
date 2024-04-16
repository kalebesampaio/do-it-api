import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import { Task } from "../entities/task.entity";
import { taskCreateSchema, taskReturnSchema } from "../schemas/task.schemas";

type TaskCreate = z.infer<typeof taskCreateSchema>;
type TaskReturn = z.infer<typeof taskReturnSchema>;
type TaskRead = Array<TaskReturn>;
type TaskUpdate = DeepPartial<Task>;

type TaskRepo = Repository<Task>;

export { TaskCreate, TaskReturn, TaskRepo, TaskRead, TaskUpdate };