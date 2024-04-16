import { z } from "zod";
import { userReturnSchema } from "./user.schemas";

const taskSchema = z.object({
  id: z.number().positive(),
  title: z.string().max(125),
  description: z.string(),
  completed: z.boolean().default(false),
  user: userReturnSchema,
});

const taskCreateSchema = taskSchema.omit({
  id: true,
  completed: true,
  user: true,
});

const taskReturnSchema = taskSchema.omit({
  user: true,
});
const taskReadSchema = taskReturnSchema.array();

const taskUpdateSchema = taskCreateSchema.partial();

export {
    taskSchema,
    taskCreateSchema,
    taskReturnSchema,
    taskReadSchema,
    taskUpdateSchema,
};