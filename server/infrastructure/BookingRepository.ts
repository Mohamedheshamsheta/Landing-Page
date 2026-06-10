import { db } from './UserRepository.js';
import { Booking, IBookingRepository, BookingStatus } from '../domain/Booking.js';

export class BookingRepository implements IBookingRepository {
  async getById(id: string): Promise<Booking | null> {
    const stmt = db.prepare('SELECT * FROM bookings WHERE id = ?');
    const row = stmt.get(id) as any;
    if (!row) return null;
    return this.mapToEntity(row);
  }

  async getByPartnerId(partnerId: string): Promise<Booking[]> {
    const stmt = db.prepare('SELECT * FROM bookings WHERE partnerId = ? ORDER BY createdAt DESC');
    const rows = stmt.all(partnerId) as any[];
    return rows.map(row => this.mapToEntity(row));
  }

  async getByTravellerId(travellerId: string): Promise<Booking[]> {
    const stmt = db.prepare('SELECT * FROM bookings WHERE travellerId = ? ORDER BY createdAt DESC');
    const rows = stmt.all(travellerId) as any[];
    return rows.map(row => this.mapToEntity(row));
  }

  async create(booking: Booking): Promise<void> {
    const stmt = db.prepare(`
      INSERT INTO bookings (id, serviceId, travellerId, partnerId, status, totalAmount, escrowAmount, commissionAmount, bookingDate, createdAt, additionalDetails)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      booking.id,
      booking.serviceId,
      booking.travellerId,
      booking.partnerId,
      booking.status,
      booking.totalAmount,
      booking.escrowAmount,
      booking.commissionAmount,
      booking.bookingDate.toISOString(),
      booking.createdAt.toISOString(),
      booking.additionalDetails ? JSON.stringify(booking.additionalDetails) : null
    );
  }

  async updateStatus(id: string, status: BookingStatus): Promise<void> {
    const stmt = db.prepare('UPDATE bookings SET status = ? WHERE id = ?');
    stmt.run(status, id);
  }

  private mapToEntity(row: any): Booking {
    return {
      ...row,
      bookingDate: new Date(row.bookingDate),
      createdAt: new Date(row.createdAt),
      additionalDetails: row.additionalDetails ? JSON.parse(row.additionalDetails) : undefined
    };
  }
}
