import { Response } from 'express';
import { BookingService } from '../../application/BookingService.js';
import { AuthRequest } from '../middleware/authMiddleware.js';
import { BookingStatus } from '../../domain/Booking.js';

export class BookingController {
  constructor(private bookingService: BookingService) {}

  async create(req: AuthRequest, res: Response) {
    try {
      const travellerId = req.user!.id;
      const { serviceId, bookingDate, additionalDetails } = req.body;
      const booking = await this.bookingService.createBooking(travellerId, serviceId, new Date(bookingDate), additionalDetails);
      res.status(201).json(booking);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getPartnerBookings(req: AuthRequest, res: Response) {
    try {
      const partnerId = req.user!.id;
      const bookings = await this.bookingService.getPartnerBookings(partnerId);
      res.json(bookings);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateStatus(req: AuthRequest, res: Response) {
    try {
      const partnerId = req.user!.id;
      const { id } = req.params;
      const { status } = req.body;
      await this.bookingService.updateBookingStatus(partnerId, id, status as BookingStatus);
      res.json({ message: 'Status updated' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
