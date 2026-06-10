import { Router } from 'express';
import { BookingController } from '../controllers/BookingController.js';
import { BookingService } from '../../application/BookingService.js';
import { BookingRepository } from '../../infrastructure/BookingRepository.js';
import { ServiceRepository } from '../../infrastructure/ServiceRepository.js';
import { authMiddleware, roleMiddleware } from '../middleware/authMiddleware.js';

const router = Router();
const bookingRepository = new BookingRepository();
const serviceRepository = new ServiceRepository();
const bookingService = new BookingService(bookingRepository, serviceRepository);
const bookingController = new BookingController(bookingService);

router.post('/', authMiddleware, (req, res) => bookingController.create(req, res));

router.get('/partner', 
  authMiddleware, 
  roleMiddleware(['Partner']), 
  (req, res) => bookingController.getPartnerBookings(req, res)
);

router.patch('/:id/status', 
  authMiddleware, 
  roleMiddleware(['Partner']), 
  (req, res) => bookingController.updateStatus(req, res)
);

export default router;
