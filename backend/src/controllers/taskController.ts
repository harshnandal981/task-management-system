import { Request, Response } from 'express';
import taskService from '../services/taskService';
import { 
  createTaskSchema, 
  updateTaskSchema, 
  getTasksQuerySchema 
} from '../validators/taskValidator';
import { ZodError } from 'zod';

interface ZodIssue {
  path: (string | number)[];
  message: string;
}

export class TaskController {
  async getTasks(req: Request, res: Response): Promise<void> {
    try {
      // Validate query parameters
      const validatedQuery = getTasksQuerySchema.parse(req.query);

      // Get tasks
      const result = await taskService.getTasks(req.user!.userId, validatedQuery);

      res.status(200).json({
        success: true,
        message: 'Tasks retrieved successfully',
        data: result,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: (error.issues as ZodIssue[]).map(e => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        });
        return;
      }

      console.error('Get tasks error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      // Validate request body
      const validatedData = createTaskSchema.parse(req.body);

      // Create task
      const task = await taskService.createTask(req.user!.userId, validatedData);

      res.status(201).json({
        success: true,
        message: 'Task created successfully',
        data: task,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: (error.issues as ZodIssue[]).map(e => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        });
        return;
      }

      console.error('Create task error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async getTaskById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Validate UUID format
      if (!id || id.length === 0 || Array.isArray(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid task ID',
        });
        return;
      }

      // Get task
      const task = await taskService.getTaskById(req.user!.userId, id);

      res.status(200).json({
        success: true,
        message: 'Task retrieved successfully',
        data: task,
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Task not found') {
        res.status(404).json({
          success: false,
          message: error.message,
        });
        return;
      }

      console.error('Get task by ID error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Validate UUID format
      if (!id || id.length === 0 || Array.isArray(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid task ID',
        });
        return;
      }

      // Validate request body
      const validatedData = updateTaskSchema.parse(req.body);

      // Update task
      const task = await taskService.updateTask(req.user!.userId, id, validatedData);

      res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        data: task,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: (error.issues as ZodIssue[]).map(e => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        });
        return;
      }

      if (error instanceof Error && error.message === 'Task not found') {
        res.status(404).json({
          success: false,
          message: error.message,
        });
        return;
      }

      console.error('Update task error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Validate UUID format
      if (!id || id.length === 0 || Array.isArray(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid task ID',
        });
        return;
      }

      // Delete task
      const result = await taskService.deleteTask(req.user!.userId, id);

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Task not found') {
        res.status(404).json({
          success: false,
          message: error.message,
        });
        return;
      }

      console.error('Delete task error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async toggleTaskStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Validate UUID format
      if (!id || id.length === 0 || Array.isArray(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid task ID',
        });
        return;
      }

      // Toggle task status
      const task = await taskService.toggleTaskStatus(req.user!.userId, id);

      res.status(200).json({
        success: true,
        message: 'Task status toggled successfully',
        data: task,
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Task not found') {
        res.status(404).json({
          success: false,
          message: error.message,
        });
        return;
      }

      console.error('Toggle task status error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}

export default new TaskController();
