import { AppError } from "../errors/AppError";
import { User } from "../entities/user.entity";
import userRepository from "../repositories/user.repository";
import { TaskCreate, TaskReturn, TaskUpdate } from "../interfaces/task.interfaces";
import { Task } from "../entities/task.entity";
import taskRepository from "../repositories/task.repository";
import { taskReturnSchema, taskSchema } from "../schemas/task.schemas";
  
export class TaskServices {
    create = async (
      taskData: TaskCreate,
      userId: number
    ): Promise<TaskReturn> => {
      const user: User = (await userRepository.findOne({
        where: { id: userId },
      }))!;
      const task: Task = taskRepository.create({
        ...taskData,
        completed: false,
        user,
  
      });
  
      await taskRepository.save(task);
  
      return taskReturnSchema.parse(task);
    };
  
  
    retrieve = async (id: number): Promise<TaskReturn> => {
      const task = await taskRepository.findOne({
        where: { id },
        relations: { user: true },
      });
  
      if (!task) {
        throw new AppError(404, "Task not found");
      }
  
      return taskSchema.parse(
        await taskRepository.findOne({
          where: { id },
          relations: { user: true },
        })
      );
    };
  
    update = async (id: number, taskData: TaskUpdate): Promise<TaskReturn> => {
      if (taskData.id) {
        throw new AppError(401, "Field id n cannot be changed");
      }
      await taskRepository.update(id, { ...taskData });
      return taskReturnSchema.parse(
        await taskRepository.findOne({
          where: { id },
        })
      );
    };
  
    destroy = async (id: number): Promise<void> => {
      const book = await taskRepository.findOne({ where: { id } });
      if (!book) {
        throw new AppError(404, "Task not found");
      }
  
      await taskRepository.delete(book.id);
    };
  }