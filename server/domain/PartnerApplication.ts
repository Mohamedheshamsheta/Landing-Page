export enum ApplicationStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected'
}

export interface PartnerApplication {
  id: string;
  userId: string;
  businessName: string;
  businessDescription: string;
  status: ApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPartnerApplicationRepository {
  create(application: PartnerApplication): Promise<void>;
  getById(id: string): Promise<PartnerApplication | null>;
  getByUserId(userId: string): Promise<PartnerApplication | null>;
  getAll(): Promise<PartnerApplication[]>;
  update(application: PartnerApplication): Promise<void>;
}
