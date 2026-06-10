export enum UserRole {
  TRAVELLER = 'Traveller',
  PARTNER = 'Partner',
  ADMIN = 'Admin'
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
}

export interface IUserRepository {
  getByEmail(email: string): Promise<User | null>;
  getById(id: string): Promise<User | null>;
  create(user: User): Promise<void>;
  updateRole(id: string, role: UserRole): Promise<void>;
}
