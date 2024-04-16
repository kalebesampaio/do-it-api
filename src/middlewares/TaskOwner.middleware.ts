import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import taskRepository from "../repositories/task.repository";

export const taskOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { admin, sub } = res.locals.decoded;
  const { id } = req.params;
  const task = await taskRepository.findOneBy({
    id: parseInt(id),
  });
  if (admin) return next();

  if (task?.user.id !== sub) {
    throw new AppError(403, "Insufficient permissions");
  }

  return next();
};