import { Router } from 'express';
import taskController from '../controllers/taskController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// All task routes are protected
router.use(authMiddleware);

// GET /tasks - Get all tasks (with pagination, filtering, search)
router.get('/', (req, res) => taskController.getTasks(req, res));

// POST /tasks - Create a new task
router.post('/', (req, res) => taskController.createTask(req, res));

// GET /tasks/:id - Get task by ID
router.get('/:id', (req, res) => taskController.getTaskById(req, res));

// PATCH /tasks/:id - Update task
router.patch('/:id', (req, res) => taskController.updateTask(req, res));

// DELETE /tasks/:id - Delete task
router.delete('/:id', (req, res) => taskController.deleteTask(req, res));

// PATCH /tasks/:id/toggle - Toggle task status
router.patch('/:id/toggle', (req, res) => taskController.toggleTaskStatus(req, res));

export default router;
