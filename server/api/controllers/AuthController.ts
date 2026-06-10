import { Request, Response } from 'express';
import { AuthService } from '../../application/AuthService.js';
import { UserRole } from '../../domain/User.js';

export class AuthController {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response) {
    try {
      const { fullName, email, password, role } = req.body;
      if (!fullName || !email || !password || !role) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const result = await this.authService.register(fullName, email, password, role as UserRole);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const result = await this.authService.login(email, password);
      res.json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  async me(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ error: 'No token' });
      
      const token = authHeader.split(' ')[1];
      const result = await this.authService.me(token);
      res.json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}
