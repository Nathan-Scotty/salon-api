import { Request, Response } from 'express';
import { findAllStylists, findStylistById, createStylist, updateStylist, deleteStylist } from '../services/stylist.service';

export async function getAll(_req: Request, res: Response) {
  try {
    return res.json({ data: await findAllStylists() });
  } catch { return res.status(500).json({ error: 'Failed to fetch stylists' }); }
}

export async function getById(req: Request, res: Response) {
  try {
    const stylist = await findStylistById(Number(req.params.id));
    if (!stylist) return res.status(404).json({ error: 'Stylist not found' });
    return res.json({ data: stylist });
  } catch { return res.status(500).json({ error: 'Failed to fetch stylist' }); }
}

export async function create(req: Request, res: Response) {
  try {
    const { userId, bio, specialties } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId is required' });
    return res.status(201).json({ data: await createStylist(userId, bio, specialties) });
  } catch (e: any) {
    if (e.code === 'P2002') return res.status(409).json({ error: 'Stylist profile already exists for this user' });
    return res.status(500).json({ error: 'Failed to create stylist' });
  }
}

export async function update(req: Request, res: Response) {
  try {
    return res.json({ data: await updateStylist(Number(req.params.id), req.body) });
  } catch (e: any) {
    if (e.code === 'P2025') return res.status(404).json({ error: 'Stylist not found' });
    return res.status(500).json({ error: 'Failed to update stylist' });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    await deleteStylist(Number(req.params.id));
    return res.json({ data: { message: 'Stylist deleted' } });
  } catch (e: any) {
    if (e.code === 'P2025') return res.status(404).json({ error: 'Stylist not found' });
    return res.status(500).json({ error: 'Failed to delete stylist' });
  }
}
