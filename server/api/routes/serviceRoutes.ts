import { Router } from 'express';
import { ServiceController } from '../controllers/ServiceController.js';
import { ServiceService } from '../../application/ServiceService.js';
import { ServiceRepository } from '../../infrastructure/ServiceRepository.js';
import { authMiddleware, roleMiddleware } from '../middleware/authMiddleware.js';

const router = Router();
const serviceRepository = new ServiceRepository();
const serviceService = new ServiceService(serviceRepository);
const serviceController = new ServiceController(serviceService);

router.get('/', (req, res) => serviceController.getAll(req, res));

router.post('/', 
  authMiddleware, 
  roleMiddleware(['Partner', 'Admin']), 
  (req, res) => serviceController.create(req, res)
);

router.get('/my-services', 
  authMiddleware, 
  roleMiddleware(['Partner']), 
  (req, res) => serviceController.getPartnerServices(req, res)
);

router.patch('/:id', 
  authMiddleware, 
  roleMiddleware(['Partner', 'Admin']), 
  (req, res) => serviceController.update(req, res)
);

router.delete('/:id', 
  authMiddleware, 
  roleMiddleware(['Partner', 'Admin']), 
  (req, res) => serviceController.delete(req, res)
);

export default router;
