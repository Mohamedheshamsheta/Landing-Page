import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { db } from './server/infrastructure/UserRepository.js';
import { UserRole } from './server/domain/User.js';

async function seed() {
  console.log('Seeding database...');

  const passwordHash = await bcrypt.hash('password123', 10);

  const users = [
    {
      id: uuidv4(),
      fullName: 'Admin User',
      email: 'admin@theard.com',
      passwordHash,
      role: UserRole.ADMIN,
      createdAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      fullName: 'Cultural Partner',
      email: 'partner@theard.com',
      passwordHash,
      role: UserRole.PARTNER,
      createdAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      fullName: 'Avid Traveller',
      email: 'traveller@theard.com',
      passwordHash,
      role: UserRole.TRAVELLER,
      createdAt: new Date().toISOString()
    }
  ];

  const insertUser = db.prepare(`
    INSERT OR IGNORE INTO users (id, fullName, email, passwordHash, role, createdAt)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  for (const user of users) {
    insertUser.run(user.id, user.fullName, user.email, user.passwordHash, user.role, user.createdAt);
  }

  // Seed some services for the partner
  const partner = users[1];
  const services = [
    {
      id: uuidv4(),
      partnerId: partner.id,
      categoryId: 'cat1',
      category: 'Adventure',
      title: 'Desert Safari & Bedouin Dinner',
      description: 'An authentic experience in the heart of the desert with traditional food and music.',
      basePrice: 150,
      location: 'Dubai Desert',
      availability: 'Daily',
      isActive: 1,
      createdAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      partnerId: partner.id,
      categoryId: 'cat2',
      category: 'Journey',
      title: 'Nile River Felucca Sunset',
      description: 'Sail the ancient Nile on a traditional wooden boat as the sun sets over Cairo.',
      basePrice: 45,
      location: 'Cairo, Egypt',
      availability: 'Weekends',
      isActive: 1,
      createdAt: new Date().toISOString()
    }
  ];

  const insertService = db.prepare(`
    INSERT OR IGNORE INTO services (id, partnerId, categoryId, category, title, description, basePrice, location, availability, isActive, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const service of services) {
    insertService.run(
      service.id,
      service.partnerId,
      service.categoryId,
      service.category,
      service.title,
      service.description,
      service.basePrice,
      service.location,
      service.availability,
      service.isActive,
      service.createdAt
    );
  }

  console.log('Database seeded successfully!');
}

seed().catch(console.error);
