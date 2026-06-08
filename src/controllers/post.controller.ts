import { Request, Response } from 'express';
import { findAllPosts, findPostById, createPost, updatePost, deletePost } from '../services/post.service';

export async function getAll(req: Request, res: Response) {
  try {
    const publishedOnly = req.query.published === 'true';
    const category = req.query.category as string | undefined;
    return res.json({ data: await findAllPosts(publishedOnly, category) });
  } catch { return res.status(500).json({ error: 'Failed to fetch posts' }); }
}

export async function getById(req: Request, res: Response) {
  try {
    const post = await findPostById(Number(req.params.id));
    if (!post) return res.status(404).json({ error: 'Post not found' });
    return res.json({ data: post });
  } catch { return res.status(500).json({ error: 'Failed to fetch post' }); }
}

export async function create(req: Request, res: Response) {
  try {
    if (!req.body.authorId) return res.status(400).json({ error: 'authorId is required' });
    return res.status(201).json({ data: await createPost(req.body) });
  } catch { return res.status(500).json({ error: 'Failed to create post' }); }
}

export async function update(req: Request, res: Response) {
  try {
    return res.json({ data: await updatePost(Number(req.params.id), req.body) });
  } catch (e: any) {
    if (e.code === 'P2025') return res.status(404).json({ error: 'Post not found' });
    return res.status(500).json({ error: 'Failed to update post' });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    await deletePost(Number(req.params.id));
    return res.json({ data: { message: 'Post deleted' } });
  } catch (e: any) {
    if (e.code === 'P2025') return res.status(404).json({ error: 'Post not found' });
    return res.status(500).json({ error: 'Failed to delete post' });
  }
}
