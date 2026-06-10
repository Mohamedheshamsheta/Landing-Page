import { v4 as uuidv4 } from 'uuid';
import { IBookingRepository, Booking, BookingStatus } from '../domain/Booking.js';
import { IServiceRepository } from '../domain/Service.js';

export class BookingService {
  constructor(
    private bookingRepository: IBookingRepository,
    private serviceRepository: IServiceRepository
  ) {}

  async createBooking(travellerId: string, serviceId: string, bookingDate: Date, additionalDetails?: any): Promise<Booking> {
    const service = await this.serviceRepository.getById(serviceId);
    if (!service) throw new Error('Service not found');

    const basePrice = service.basePrice;
    const userFee = basePrice * 0.03;
    const totalAmount = basePrice + userFee;
    
    const partnerCommission = basePrice * 0.10;
    const escrowAmount = basePrice - partnerCommission;
    const totalPlatformRevenue = userFee + partnerCommission;

    const booking: Booking = {
      id: uuidv4(),
      serviceId,
      travellerId,
      partnerId: service.partnerId,
      status: BookingStatus.PENDING,
      totalAmount, // What the user pays (including 3% fee)
      escrowAmount, // What the partner eventually gets
      commissionAmount: totalPlatformRevenue, // Total platform take
      bookingDate,
      createdAt: new Date(),
      additionalDetails
    };

    await this.bookingRepository.create(booking);
    return booking;
  }

  async getPartnerBookings(partnerId: string): Promise<Booking[]> {
    return this.bookingRepository.getByPartnerId(partnerId);
  }

  async updateBookingStatus(partnerId: string, bookingId: string, status: BookingStatus): Promise<void> {
    const booking = await this.bookingRepository.getById(bookingId);
    if (!booking) throw new Error('Booking not found');
    if (booking.partnerId !== partnerId) throw new Error('Unauthorized');

    await this.bookingRepository.updateStatus(bookingId, status);
  }
}
