import { db } from './UserRepository.js';
import { Service, IServiceRepository, ServiceCategory } from '../domain/Service.js';

export class ServiceRepository implements IServiceRepository {
  async getById(id: string): Promise<Service | null> {
    const stmt = db.prepare('SELECT * FROM services WHERE id = ?');
    const row = stmt.get(id) as any;
    if (!row) return null;
    return this.mapToEntity(row);
  }

  async getAll(): Promise<Service[]> {
    const stmt = db.prepare('SELECT * FROM services WHERE isActive = 1');
    const rows = stmt.all() as any[];
    return rows.map(row => this.mapToEntity(row));
  }

  async getByPartnerId(partnerId: string): Promise<Service[]> {
    const stmt = db.prepare('SELECT * FROM services WHERE partnerId = ?');
    const rows = stmt.all(partnerId) as any[];
    return rows.map(row => this.mapToEntity(row));
  }

  async getByCategory(category: ServiceCategory): Promise<Service[]> {
    const stmt = db.prepare('SELECT * FROM services WHERE category = ? AND isActive = 1');
    const rows = stmt.all(category) as any[];
    return rows.map(row => this.mapToEntity(row));
  }

  async create(service: Service): Promise<void> {
    const stmt = db.prepare(`
      INSERT INTO services (id, partnerId, categoryId, category, title, description, basePrice, location, availability, isActive, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      service.id,
      service.partnerId,
      service.categoryId,
      service.category,
      service.title,
      service.description,
      service.basePrice,
      service.location,
      service.availability,
      service.isActive ? 1 : 0,
      service.createdAt.toISOString()
    );
  }

  async update(service: Service): Promise<void> {
    const stmt = db.prepare(`
      UPDATE services 
      SET title = ?, description = ?, basePrice = ?, location = ?, availability = ?, isActive = ?
      WHERE id = ?
    `);
    stmt.run(
      service.title,
      service.description,
      service.basePrice,
      service.location,
      service.availability,
      service.isActive ? 1 : 0,
      service.id
    );
  }

  async delete(id: string): Promise<void> {
    const stmt = db.prepare('DELETE FROM services WHERE id = ?');
    stmt.run(id);
  }

  private mapToEntity(row: any): Service {
    return {
      ...row,
      isActive: row.isActive === 1,
      createdAt: new Date(row.createdAt)
    };
  }
}
