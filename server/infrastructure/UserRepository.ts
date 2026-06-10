import { User, IUserRepository, UserRole } from '../domain/User.js';

let db: any;

async function initDb() {
  try {
    const { default: Database } = await import('better-sqlite3');
    db = new Database('the_ard.db');
    console.log('Database initialized successfully.');
    
    // Initialize all tables
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        fullName TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        passwordHash TEXT NOT NULL,
        role TEXT NOT NULL,
        createdAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS services (
        id TEXT PRIMARY KEY,
        partnerId TEXT NOT NULL,
        categoryId TEXT NOT NULL,
        category TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        basePrice REAL NOT NULL,
        location TEXT NOT NULL,
        availability TEXT NOT NULL,
        isActive INTEGER NOT NULL,
        createdAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS bookings (
        id TEXT PRIMARY KEY,
        serviceId TEXT NOT NULL,
        travellerId TEXT NOT NULL,
        partnerId TEXT NOT NULL,
        status TEXT NOT NULL,
        totalAmount REAL NOT NULL,
        escrowAmount REAL NOT NULL,
        commissionAmount REAL NOT NULL,
        bookingDate TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        additionalDetails TEXT,
        FOREIGN KEY (serviceId) REFERENCES services(id),
        FOREIGN KEY (travellerId) REFERENCES users(id),
        FOREIGN KEY (partnerId) REFERENCES users(id)
      );

      CREATE TABLE IF NOT EXISTS partner_applications (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        businessName TEXT NOT NULL,
        businessDescription TEXT NOT NULL,
        status TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id)
      );

      CREATE TABLE IF NOT EXISTS notifications (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        type TEXT NOT NULL,
        isRead INTEGER DEFAULT 0,
        createdAt TEXT NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id)
      );
    `);
  } catch (err) {
    console.error('Failed to initialize better-sqlite3:', err);
    console.log('Falling back to in-memory mock database for development.');
    // Simple mock for development if sqlite fails
    db = {
      prepare: () => ({
        get: () => null,
        run: () => ({ changes: 0 }),
        all: () => []
      }),
      exec: () => {}
    };
  }
}

// Initialize immediately
initDb();

// Proxy to handle lazy initialization
const dbProxy = new Proxy({} as any, {
  get: (target, prop) => {
    if (!db) {
      // If db is not ready, we can't do much for synchronous calls like prepare()
      // but we can at least throw a better error or try to init
      // In practice, the first call will likely be from a route handler which is async
      console.warn(`Database not ready yet for property: ${String(prop)}`);
    }
    return db?.[prop];
  }
});

export class UserRepository implements IUserRepository {
  async getByEmail(email: string): Promise<User | null> {
    if (!db) await initDb();
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    const row = stmt.get(email) as any;
    if (!row) return null;
    return {
      ...row,
      createdAt: new Date(row.createdAt)
    };
  }

  async getById(id: string): Promise<User | null> {
    if (!db) await initDb();
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    const row = stmt.get(id) as any;
    if (!row) return null;
    return {
      ...row,
      createdAt: new Date(row.createdAt)
    };
  }

  async create(user: User): Promise<void> {
    if (!db) await initDb();
    const stmt = db.prepare(`
      INSERT INTO users (id, fullName, email, passwordHash, role, createdAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    stmt.run(user.id, user.fullName, user.email, user.passwordHash, user.role, user.createdAt.toISOString());
  }

  async updateRole(id: string, role: UserRole): Promise<void> {
    if (!db) await initDb();
    const stmt = db.prepare('UPDATE users SET role = ? WHERE id = ?');
    stmt.run(role, id);
  }
}

export { dbProxy as db };
