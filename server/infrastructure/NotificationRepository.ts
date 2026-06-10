import { db } from './UserRepository.js';
import { Notification, INotificationRepository } from '../domain/Notification.js';

export class NotificationRepository implements INotificationRepository {
  async getByUserId(userId: string): Promise<Notification[]> {
    const stmt = db.prepare('SELECT * FROM notifications WHERE userId = ? ORDER BY createdAt DESC');
    const rows = stmt.all(userId) as any[];
    return rows.map(row => ({
      ...row,
      isRead: !!row.isRead,
      createdAt: new Date(row.createdAt)
    }));
  }

  async create(notification: Notification): Promise<void> {
    const stmt = db.prepare(`
      INSERT INTO notifications (id, userId, title, message, type, isRead, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      notification.id,
      notification.userId,
      notification.title,
      notification.message,
      notification.type,
      notification.isRead ? 1 : 0,
      notification.createdAt.toISOString()
    );
  }

  async markAsRead(id: string): Promise<void> {
    const stmt = db.prepare('UPDATE notifications SET isRead = 1 WHERE id = ?');
    stmt.run(id);
  }

  async markAllAsRead(userId: string): Promise<void> {
    const stmt = db.prepare('UPDATE notifications SET isRead = 1 WHERE userId = ?');
    stmt.run(userId);
  }

  async delete(id: string): Promise<void> {
    const stmt = db.prepare('DELETE FROM notifications WHERE id = ?');
    stmt.run(id);
  }
}
