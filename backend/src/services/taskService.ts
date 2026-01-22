import prisma from '../utils/prisma';
import type { CreateTaskInput, UpdateTaskInput, GetTasksQuery } from '../validators/taskValidator';
import { Prisma } from '@prisma/client';

export class TaskService {
  async getTasks(userId: string, query: GetTasksQuery) {
    const { page, limit, status, search } = query;
    
    const skip = (page - 1) * limit;
    const take = limit;

    // Build where clause
    const where: Prisma.TaskWhereInput = {
      userId,
      ...(status && { status }),
      ...(search && {
        title: {
          contains: search,
          mode: 'insensitive' as Prisma.QueryMode,
        },
      }),
    };

    // Get tasks and total count
    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.task.count({ where }),
    ]);

    return {
      tasks,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async createTask(userId: string, data: CreateTaskInput) {
    const task = await prisma.task.create({
      data: {
        ...data,
        userId,
      },
    });

    return task;
  }

  async getTaskById(userId: string, taskId: string) {
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId,
      },
    });

    if (!task) {
      throw new Error('Task not found');
    }

    return task;
  }

  async updateTask(userId: string, taskId: string, data: UpdateTaskInput) {
    // First verify task belongs to user
    await this.getTaskById(userId, taskId);

    const task = await prisma.task.update({
      where: { id: taskId },
      data,
    });

    return task;
  }

  async deleteTask(userId: string, taskId: string) {
    // First verify task belongs to user
    await this.getTaskById(userId, taskId);

    await prisma.task.delete({
      where: { id: taskId },
    });

    return { message: 'Task deleted successfully' };
  }

  async toggleTaskStatus(userId: string, taskId: string) {
    // First get the task to verify ownership and current status
    const task = await this.getTaskById(userId, taskId);

    // Toggle status
    const newStatus = task.status === 'PENDING' ? 'COMPLETED' : 'PENDING';

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { status: newStatus },
    });

    return updatedTask;
  }
}

export default new TaskService();
