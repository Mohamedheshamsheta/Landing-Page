import { Response } from 'express';
import { ServiceService } from '../../application/ServiceService.js';
import { AuthRequest } from '../middleware/authMiddleware.js';
import { ServiceCategory } from '../../domain/Service.js';

export class ServiceController {
  constructor(private serviceService: ServiceService) {}

  async create(req: AuthRequest, res: Response) {
    try {
      const partnerId = req.user!.id;
      const service = await this.serviceService.createService(partnerId, req.body);
      res.status(201).json(service);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req: AuthRequest, res: Response) {
    try {
      const { category } = req.query;
      const services = await this.serviceService.getServices(category as ServiceCategory);
      res.json(services);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getPartnerServices(req: AuthRequest, res: Response) {
    try {
      const partnerId = req.user!.id;
      const services = await this.serviceService.getPartnerServices(partnerId);
      res.json(services);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const partnerId = req.user!.id;
      const service = await this.serviceService.getServiceById(id);
      if (!service || service.partnerId !== partnerId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
      await this.serviceService.updateService(id, req.body);
      res.json({ message: 'Service updated' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const partnerId = req.user!.id;
      const service = await this.serviceService.getServiceById(id);
      if (!service || service.partnerId !== partnerId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
      await this.serviceService.deleteService(id);
      res.json({ message: 'Service deleted' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
