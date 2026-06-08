import { Request, Response } from 'express';
import { findAllProducts, findProductById, createProduct, updateProduct, deleteProduct } from '../services/product.service';

export async function getAll(req: Request, res: Response) {
  try {
    const activeOnly = req.query.active === 'true';
    return res.json({ data: await findAllProducts(activeOnly) });
  } catch { return res.status(500).json({ error: 'Failed to fetch products' }); }
}

export async function getById(req: Request, res: Response) {
  try {
    const product = await findProductById(Number(req.params.id));
    if (!product) return res.status(404).json({ error: 'Product not found' });
    return res.json({ data: product });
  } catch { return res.status(500).json({ error: 'Failed to fetch product' }); }
}

export async function create(req: Request, res: Response) {
  try {
    const { name, price } = req.body;
    if (!name || price === undefined) return res.status(400).json({ error: 'name and price are required' });
    return res.status(201).json({ data: await createProduct(req.body) });
  } catch { return res.status(500).json({ error: 'Failed to create product' }); }
}

export async function update(req: Request, res: Response) {
  try {
    return res.json({ data: await updateProduct(Number(req.params.id), req.body) });
  } catch (e: any) {
    if (e.code === 'P2025') return res.status(404).json({ error: 'Product not found' });
    return res.status(500).json({ error: 'Failed to update product' });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    await deleteProduct(Number(req.params.id));
    return res.json({ data: { message: 'Product deleted' } });
  } catch (e: any) {
    if (e.code === 'P2025') return res.status(404).json({ error: 'Product not found' });
    return res.status(500).json({ error: 'Failed to delete product' });
  }
}
