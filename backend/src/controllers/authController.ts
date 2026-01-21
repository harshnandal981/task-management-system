import { Request, Response } from 'express';
import authService from '../services/authService';
import { registerSchema, loginSchema, refreshTokenSchema } from '../validators/authValidator';
import { ZodError } from 'zod';

interface ZodIssue {
  path: (string | number)[];
  message: string;
}

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      // Validate request body
      const validatedData = registerSchema.parse(req.body);

      // Register user
      const user = await authService.register(validatedData);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: user,
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

      if (error instanceof Error && error.message === 'User with this email already exists') {
        res.status(400).json({
          success: false,
          message: error.message,
        });
        return;
      }

      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      // Validate request body
      const validatedData = loginSchema.parse(req.body);

      // Login user
      const result = await authService.login(validatedData);

      res.status(200).json({
        success: true,
        message: 'Login successful',
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

      if (error instanceof Error && error.message === 'Invalid email or password') {
        res.status(401).json({
          success: false,
          message: error.message,
        });
        return;
      }

      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async refresh(req: Request, res: Response): Promise<void> {
    try {
      // Validate request body
      const validatedData = refreshTokenSchema.parse(req.body);

      // Refresh token
      const result = await authService.refreshToken(validatedData.refreshToken);

      res.status(200).json({
        success: true,
        message: 'Token refreshed successfully',
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

      if (error instanceof Error && error.message === 'Invalid or expired refresh token') {
        res.status(401).json({
          success: false,
          message: error.message,
        });
        return;
      }

      console.error('Token refresh error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async logout(_req: Request, res: Response): Promise<void> {
    try {
      const result = await authService.logout();

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}

export default new AuthController();
