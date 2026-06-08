import { Request, Response } from 'express';
import { findAllServices, findServiceById, createService, updateService, deleteService } from '../services/service.service';

export async function getAll(req: Request, res: Response) {
  try {
    const activeOnly = req.query.active === 'true';
    return res.json({ data: await findAllServices(activeOnly) });
  } catch { return res.status(500).json({ error: 'Failed to fetch services' }); }
}

export async function getById(req: Request, res: Response) {
  try {
    const service = await findServiceById(Number(req.params.id));
    if (!service) return res.status(404).json({ error: 'Service not found' });
    return res.json({ data: service });
  } catch { return res.status(500).json({ error: 'Failed to fetch service' }); }
}

export async function create(req: Request, res: Response) {
  try {
    const { name, price, durationMin } = req.body;
    if (!name || price === undefined || !durationMin) {
      return res.status(400).json({ error: 'name, price, and durationMin are required' });
    }
    return res.status(201).json({ data: await createService(req.body) });
  } catch { return res.status(500).json({ error: 'Failed to create service' }); }
}

export async function update(req: Request, res: Response) {
  try {
    return res.json({ data: await updateService(Number(req.params.id), req.body) });
  } catch (e: any) {
    if (e.code === 'P2025') return res.status(404).json({ error: 'Service not found' });
    return res.status(500).json({ error: 'Failed to update service' });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    await deleteService(Number(req.params.id));
    return res.json({ data: { message: 'Service deleted' } });
  } catch (e: any) {
    if (e.code === 'P2025') return res.status(404).json({ error: 'Service not found' });
    return res.status(500).json({ error: 'Failed to delete service' });
  }
}
