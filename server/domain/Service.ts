export enum ServiceCategory {
  STAY = 'Stay',
  JOURNEY = 'Journey',
  ADVENTURE = 'Adventure',
  PRODUCT = 'Product'
}

export interface Service {
  id: string;
  partnerId: string;
  categoryId: string;
  category: ServiceCategory;
  title: string;
  description: string;
  basePrice: number;
  location: string;
  availability: string;
  isActive: boolean;
  createdAt: Date;
}

export interface IServiceRepository {
  getById(id: string): Promise<Service | null>;
  getAll(): Promise<Service[]>;
  getByPartnerId(partnerId: string): Promise<Service[]>;
  getByCategory(category: ServiceCategory): Promise<Service[]>;
  create(service: Service): Promise<void>;
  update(service: Service): Promise<void>;
  delete(id: string): Promise<void>;
}
