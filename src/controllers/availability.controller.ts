import { Request, Response } from 'express';
import { findAllAvailabilities, findAvailabilityById, createAvailability, updateAvailability, deleteAvailability } from '../services/availability.service';

export async function getAll(req: Request, res: Response) {
  try {
    const stylistId = req.query.stylistId ? Number(req.query.stylistId) : undefined;
    const availableOnly = req.query.available === 'true';
    return res.json({ data: await findAllAvailabilities(stylistId, availableOnly) });
  } catch { return res.status(500).json({ error: 'Failed to fetch availability' }); }
}

export async function getById(req: Request, res: Response) {
  try {
    const slot = await findAvailabilityById(Number(req.params.id));
    if (!slot) return res.status(404).json({ error: 'Availability slot not found' });
    return res.json({ data: slot });
  } catch { return res.status(500).json({ error: 'Failed to fetch slot' }); }
}

export async function create(req: Request, res: Response) {
  try {
    const { stylistId, date, startTime, endTime } = req.body;
    if (!stylistId || !date || !startTime || !endTime) {
      return res.status(400).json({ error: 'stylistId, date, startTime, and endTime are required' });
    }
    return res.status(201).json({ data: await createAvailability(stylistId, date, startTime, endTime) });
  } catch { return res.status(500).json({ error: 'Failed to create availability slot' }); }
}

export async function update(req: Request, res: Response) {
  try {
    return res.json({ data: await updateAvailability(Number(req.params.id), req.body) });
  } catch (e: any) {
    if (e.code === 'P2025') return res.status(404).json({ error: 'Slot not found' });
    return res.status(500).json({ error: 'Failed to update slot' });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    await deleteAvailability(Number(req.params.id));
    return res.json({ data: { message: 'Availability slot deleted' } });
  } catch (e: any) {
    if (e.code === 'P2025') return res.status(404).json({ error: 'Slot not found' });
    return res.status(500).json({ error: 'Failed to delete slot' });
  }
}
