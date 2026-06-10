import { v4 as uuidv4 } from 'uuid';
import { PartnerApplication, IPartnerApplicationRepository, ApplicationStatus } from '../domain/PartnerApplication.js';
import { IUserRepository, UserRole } from '../domain/User.js';

export class PartnerApplicationService {
  constructor(
    private applicationRepository: IPartnerApplicationRepository,
    private userRepository: IUserRepository
  ) {}

  async apply(userId: string, businessName: string, businessDescription: string): Promise<PartnerApplication> {
    const existing = await this.applicationRepository.getByUserId(userId);
    if (existing) {
      throw new Error('Application already exists for this user');
    }

    const application: PartnerApplication = {
      id: uuidv4(),
      userId,
      businessName,
      businessDescription,
      status: ApplicationStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await this.applicationRepository.create(application);
    return application;
  }

  async getByUserId(userId: string): Promise<PartnerApplication | null> {
    return this.applicationRepository.getByUserId(userId);
  }

  async getAll(): Promise<PartnerApplication[]> {
    return this.applicationRepository.getAll();
  }

  async approve(applicationId: string): Promise<void> {
    const application = await this.applicationRepository.getById(applicationId);
    if (!application) throw new Error('Application not found');

    application.status = ApplicationStatus.APPROVED;
    application.updatedAt = new Date();
    await this.applicationRepository.update(application);

    // Switch user role to Partner
    await this.userRepository.updateRole(application.userId, UserRole.PARTNER);
  }

  async reject(applicationId: string): Promise<void> {
    const application = await this.applicationRepository.getById(applicationId);
    if (!application) throw new Error('Application not found');

    application.status = ApplicationStatus.REJECTED;
    application.updatedAt = new Date();
    await this.applicationRepository.update(application);
  }
}
