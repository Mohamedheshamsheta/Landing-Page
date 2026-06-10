import express from 'express';
import { PartnerApplicationRepository } from '../../infrastructure/PartnerApplicationRepository.js';
import { UserRepository } from '../../infrastructure/UserRepository.js';
import { PartnerApplicationService } from '../../application/PartnerApplicationService.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const applicationRepository = new PartnerApplicationRepository();
const userRepository = new UserRepository();
const applicationService = new PartnerApplicationService(applicationRepository, userRepository);

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to verify JWT
const authenticate = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Middleware to check admin role
const isAdmin = (req: any, res: any, next: any) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

router.post('/apply', authenticate, async (req: any, res) => {
  try {
    const { businessName, businessDescription } = req.body;
    const application = await applicationService.apply(req.user.id, businessName, businessDescription);
    res.status(201).json(application);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/my-application', authenticate, async (req: any, res) => {
  try {
    const application = await applicationService.getByUserId(req.user.id);
    res.json(application);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/all', authenticate, isAdmin, async (req, res) => {
  try {
    const applications = await applicationService.getAll();
    res.json(applications);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/:id/approve', authenticate, isAdmin, async (req, res) => {
  try {
    await applicationService.approve(req.params.id);
    res.json({ message: 'Application approved' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/:id/reject', authenticate, isAdmin, async (req, res) => {
  try {
    await applicationService.reject(req.params.id);
    res.json({ message: 'Application rejected' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
