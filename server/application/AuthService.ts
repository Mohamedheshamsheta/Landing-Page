import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { IUserRepository, UserRole, User } from '../domain/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'the-ard-secret-key';

export interface AuthResponse {
  user: Omit<User, 'passwordHash'>;
  token: string;
}

export class AuthService {
  constructor(private userRepository: IUserRepository) {}

  async register(fullName: string, email: string, password: string, role: UserRole): Promise<AuthResponse> {
    const existingUser = await this.userRepository.getByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user: User = {
      id: uuidv4(),
      fullName,
      email,
      passwordHash,
      role,
      createdAt: new Date()
    };

    await this.userRepository.create(user);

    const token = this.generateToken(user);
    const { passwordHash: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token
    };
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await this.userRepository.getByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user);
    const { passwordHash: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token
    };
  }

  async me(token: string): Promise<Omit<User, 'passwordHash'>> {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
      const user = await this.userRepository.getById(decoded.id);
      if (!user) throw new Error('User not found');
      
      const { passwordHash: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (e) {
      throw new Error('Invalid token');
    }
  }

  private generateToken(user: User): string {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
  }
}
