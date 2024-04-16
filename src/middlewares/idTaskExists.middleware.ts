import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { Task } from "../entities/task.entity";
import taskRepository from "../repositories/task.repository";

export const idTaskExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
    const id: number = parseInt(req.params.id);

  const foundEntity: Task | null = await taskRepository.findOneBy({ id });
  if (!foundEntity) throw new AppError(404, "Task not found");

  res.locals = { ...res.locals, foundEntity };

  return next();
};