import { Request, Response } from 'express';
import { findAllClients, findClientById, createClient, updateClient, deleteClient } from '../services/client.service';

export async function getAll(_req: Request, res: Response) {
  try {
    return res.json({ data: await findAllClients() });
  } catch { return res.status(500).json({ error: 'Failed to fetch clients' }); }
}

export async function getById(req: Request, res: Response) {
  try {
    const client = await findClientById(Number(req.params.id));
    if (!client) return res.status(404).json({ error: 'Client not found' });
    return res.json({ data: client });
  } catch { return res.status(500).json({ error: 'Failed to fetch client' }); }
}

export async function create(req: Request, res: Response) {
  try {
    const { userId, notes } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId is required' });
    return res.status(201).json({ data: await createClient(userId, notes) });
  } catch (e: any) {
    if (e.code === 'P2002') return res.status(409).json({ error: 'Client profile already exists for this user' });
    return res.status(500).json({ error: 'Failed to create client' });
  }
}

export async function update(req: Request, res: Response) {
  try {
    return res.json({ data: await updateClient(Number(req.params.id), req.body) });
  } catch (e: any) {
    if (e.code === 'P2025') return res.status(404).json({ error: 'Client not found' });
    return res.status(500).json({ error: 'Failed to update client' });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    await deleteClient(Number(req.params.id));
    return res.json({ data: { message: 'Client deleted' } });
  } catch (e: any) {
    if (e.code === 'P2025') return res.status(404).json({ error: 'Client not found' });
    return res.status(500).json({ error: 'Failed to delete client' });
  }
}
