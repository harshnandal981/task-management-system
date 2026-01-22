import { z } from 'zod';

export const taskStatusEnum = z.enum(['PENDING', 'COMPLETED']);

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
  status: taskStatusEnum.optional().default('PENDING'),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters').optional(),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional().nullable(),
  status: taskStatusEnum.optional(),
});

export const getTasksQuerySchema = z.object({
  page: z.string().optional().default('1').transform((val) => {
    const parsed = parseInt(val, 10);
    return isNaN(parsed) || parsed < 1 ? 1 : parsed;
  }),
  limit: z.string().optional().default('10').transform((val) => {
    const parsed = parseInt(val, 10);
    return isNaN(parsed) || parsed < 1 ? 10 : parsed;
  }),
  status: taskStatusEnum.optional(),
  search: z.string().optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type GetTasksQuery = z.infer<typeof getTasksQuerySchema>;
export type TaskStatus = z.infer<typeof taskStatusEnum>;
