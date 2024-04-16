import { Router } from "express";
import middlewares from "../middlewares";
import { UserControllers } from "../controllers/user.controllers";
import { userCreateSchema } from "../schemas/user.schemas";

export const userRouter: Router = Router();
const userController = new UserControllers();

userRouter.post(
  "",
  middlewares.validateBody(userCreateSchema),
  middlewares.uniqueEmail,
  userController.create
);
userRouter.get(
  "",
  middlewares.verifyToken,
  userController.get
);

userRouter.get(
  "/:id",
  middlewares.idUserExists,
  middlewares.verifyToken,
  middlewares.isOwner,
  userController.retrieve
);
userRouter.patch(
  "/:id",
  middlewares.verifyToken,
  middlewares.uniqueEmail,
  middlewares.idUserExists,
  middlewares.isOwner,
  userController.update
);
userRouter.delete(
  "/:id",
  middlewares.verifyToken,
  middlewares.idUserExists,
  middlewares.isOwner,
  userController.delete
);