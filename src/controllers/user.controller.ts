import { Request, Response } from 'express';
import { findAllUsers, findUserById, updateUser, deleteUser } from '../services/user.service';

export async function getAll(_req: Request, res: Response) {
  try {
    return res.json({ data: await findAllUsers() });
  } catch { return res.status(500).json({ error: 'Failed to fetch users' }); }
}

export async function getById(req: Request, res: Response) {
  try {
    const user = await findUserById(Number(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json({ data: user });
  } catch { return res.status(500).json({ error: 'Failed to fetch user' }); }
}

export async function update(req: Request, res: Response) {
  try {
    return res.json({ data: await updateUser(Number(req.params.id), req.body) });
  } catch (e: any) {
    if (e.code === 'P2025') return res.status(404).json({ error: 'User not found' });
    return res.status(500).json({ error: 'Failed to update user' });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    await deleteUser(Number(req.params.id));
    return res.json({ data: { message: 'User deleted' } });
  } catch (e: any) {
    if (e.code === 'P2025') return res.status(404).json({ error: 'User not found' });
    return res.status(500).json({ error: 'Failed to delete user' });
  }
}
