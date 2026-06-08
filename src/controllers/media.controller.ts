import { Request, Response } from 'express';
import { findMediaByPost, findMediaById, createMedia, updateMedia, deleteMedia } from '../services/media.service';

export async function getByPost(req: Request, res: Response) {
  try {
    const postId = Number(req.query.postId);
    if (!postId) return res.status(400).json({ error: 'postId query param is required' });
    return res.json({ data: await findMediaByPost(postId) });
  } catch { return res.status(500).json({ error: 'Failed to fetch media' }); }
}

export async function getById(req: Request, res: Response) {
  try {
    const media = await findMediaById(Number(req.params.id));
    if (!media) return res.status(404).json({ error: 'Media not found' });
    return res.json({ data: media });
  } catch { return res.status(500).json({ error: 'Failed to fetch media' }); }
}

export async function create(req: Request, res: Response) {
  try {
    const { postId, url } = req.body;
    if (!postId || !url) return res.status(400).json({ error: 'postId and url are required' });
    return res.status(201).json({ data: await createMedia(req.body) });
  } catch { return res.status(500).json({ error: 'Failed to create media' }); }
}

export async function update(req: Request, res: Response) {
  try {
    return res.json({ data: await updateMedia(Number(req.params.id), req.body) });
  } catch (e: any) {
    if (e.code === 'P2025') return res.status(404).json({ error: 'Media not found' });
    return res.status(500).json({ error: 'Failed to update media' });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    await deleteMedia(Number(req.params.id));
    return res.json({ data: { message: 'Media deleted' } });
  } catch (e: any) {
    if (e.code === 'P2025') return res.status(404).json({ error: 'Media not found' });
    return res.status(500).json({ error: 'Failed to delete media' });
  }
}
