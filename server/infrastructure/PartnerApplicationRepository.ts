import { db } from './UserRepository.js';
import { PartnerApplication, IPartnerApplicationRepository, ApplicationStatus } from '../domain/PartnerApplication.js';

export class PartnerApplicationRepository implements IPartnerApplicationRepository {
  async create(application: PartnerApplication): Promise<void> {
    const stmt = db.prepare(`
      INSERT INTO partner_applications (id, userId, businessName, businessDescription, status, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      application.id,
      application.userId,
      application.businessName,
      application.businessDescription,
      application.status,
      application.createdAt.toISOString(),
      application.updatedAt.toISOString()
    );
  }

  async getById(id: string): Promise<PartnerApplication | null> {
    const stmt = db.prepare('SELECT * FROM partner_applications WHERE id = ?');
    const row = stmt.get(id) as any;
    if (!row) return null;
    return this.mapRowToApplication(row);
  }

  async getByUserId(userId: string): Promise<PartnerApplication | null> {
    const stmt = db.prepare('SELECT * FROM partner_applications WHERE userId = ?');
    const row = stmt.get(userId) as any;
    if (!row) return null;
    return this.mapRowToApplication(row);
  }

  async getAll(): Promise<PartnerApplication[]> {
    const stmt = db.prepare('SELECT * FROM partner_applications ORDER BY createdAt DESC');
    const rows = stmt.all() as any[];
    return rows.map(row => this.mapRowToApplication(row));
  }

  async update(application: PartnerApplication): Promise<void> {
    const stmt = db.prepare(`
      UPDATE partner_applications
      SET status = ?, updatedAt = ?
      WHERE id = ?
    `);
    stmt.run(application.status, application.updatedAt.toISOString(), application.id);
  }

  private mapRowToApplication(row: any): PartnerApplication {
    return {
      ...row,
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt)
    };
  }
}
