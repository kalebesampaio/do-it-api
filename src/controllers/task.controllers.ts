import { Request, Response } from "express";
import { TaskServices } from "../services/task.services";
import { TaskReturn } from "../interfaces/task.interfaces";


export class TaskControllers {
  private taskService = new TaskServices();

  create = async (req: Request, res: Response): Promise<Response> => {
    const userId: number = res.locals.decoded.sub;
    const book: TaskReturn = await this.taskService.create(req.body, userId);

    return res.status(201).json(book);
  };

  retrieve = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.id;
    const book = await this.taskService.retrieve(parseInt(id));

    return res.status(200).json(book);
  };
  update = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.id;
    const book: TaskReturn = await this.taskService.update(parseInt(id), req.body);

    return res.status(200).json(book);
  };
  delete = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.id;
    await this.taskService.destroy(parseInt(id));
    return res.status(204).json();
  };
}