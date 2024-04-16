import { z } from "zod";

const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(150),
  email: z.string().max(150).email(),
  password: z.string().max(150),
});

const userCreateSchema = userSchema.omit({
  id: true,
});

const userReturnSchema = userSchema.omit({ password: true });
const userReadSchema = userReturnSchema.array();

const userUpdateSchema = userCreateSchema.partial();
export {
  userSchema,
  userCreateSchema,
  userUpdateSchema,
  userReturnSchema,
  userReadSchema,
};