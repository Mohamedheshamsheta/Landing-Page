import { v4 as uuidv4 } from 'uuid';
import { IServiceRepository, Service, ServiceCategory } from '../domain/Service.js';

export class ServiceService {
  constructor(private serviceRepository: IServiceRepository) {}

  async createService(partnerId: string, data: Omit<Service, 'id' | 'partnerId' | 'createdAt' | 'isActive'>): Promise<Service> {
    const service: Service = {
      id: uuidv4(),
      partnerId,
      ...data,
      isActive: true,
      createdAt: new Date()
    };

    await this.serviceRepository.create(service);
    return service;
  }

  async getServices(category?: ServiceCategory): Promise<Service[]> {
    if (category) {
      return this.serviceRepository.getByCategory(category);
    }
    return this.serviceRepository.getAll();
  }

  async getPartnerServices(partnerId: string): Promise<Service[]> {
    return this.serviceRepository.getByPartnerId(partnerId);
  }

  async getServiceById(id: string): Promise<Service | null> {
    return this.serviceRepository.getById(id);
  }

  async updateService(id: string, data: Partial<Service>): Promise<void> {
    const service = await this.serviceRepository.getById(id);
    if (!service) throw new Error('Service not found');
    await this.serviceRepository.update({ ...service, ...data });
  }

  async deleteService(id: string): Promise<void> {
    await this.serviceRepository.delete(id);
  }
}
