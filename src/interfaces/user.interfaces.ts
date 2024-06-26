import { AnyZodObject, z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { userCreateSchema, userReadSchema, userReturnSchema } from "../schemas/user.schemas";

type UserCreate = z.infer<typeof userCreateSchema>;
type UserRead = z.infer<typeof userReadSchema>;
type UserReturn = z.infer<typeof userReturnSchema>;
type UserUpdate = DeepPartial<User>;

type UserRepo = Repository<User>;

interface RequestSchema {
  params?: AnyZodObject;
  body?: AnyZodObject;
  query?: AnyZodObject;
}

export {
  UserCreate,
  UserRead,
  UserReturn,
  UserUpdate,
  UserRepo,
  RequestSchema,
};