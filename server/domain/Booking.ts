export enum BookingStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

export interface Booking {
  id: string;
  serviceId: string;
  travellerId: string;
  partnerId: string;
  status: BookingStatus;
  totalAmount: number;
  escrowAmount: number; // 90% of total
  commissionAmount: number; // 10% of total
  bookingDate: Date;
  createdAt: Date;
  additionalDetails?: any;
}

export interface IBookingRepository {
  getById(id: string): Promise<Booking | null>;
  getByPartnerId(partnerId: string): Promise<Booking[]>;
  getByTravellerId(travellerId: string): Promise<Booking[]>;
  create(booking: Booking): Promise<void>;
  updateStatus(id: string, status: BookingStatus): Promise<void>;
}
