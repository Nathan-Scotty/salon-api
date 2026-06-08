import { Request, Response } from 'express';
import { findAllPayments, findPaymentById, createPayment, updatePayment, deletePayment } from '../services/payment.service';

export async function getAll(_req: Request, res: Response) {
  try {
    return res.json({ data: await findAllPayments() });
  } catch { return res.status(500).json({ error: 'Failed to fetch payments' }); }
}

export async function getById(req: Request, res: Response) {
  try {
    const payment = await findPaymentById(Number(req.params.id));
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    return res.json({ data: payment });
  } catch { return res.status(500).json({ error: 'Failed to fetch payment' }); }
}

export async function create(req: Request, res: Response) {
  try {
    const { appointmentId, clientId, amount } = req.body;
    if (!appointmentId || !clientId || amount === undefined) {
      return res.status(400).json({ error: 'appointmentId, clientId, and amount are required' });
    }
    return res.status(201).json({ data: await createPayment(req.body) });
  } catch (e: any) {
    if (e.code === 'P2002') return res.status(409).json({ error: 'Payment already exists for this appointment' });
    return res.status(500).json({ error: 'Failed to create payment' });
  }
}

export async function update(req: Request, res: Response) {
  try {
    return res.json({ data: await updatePayment(Number(req.params.id), req.body) });
  } catch (e: any) {
    if (e.code === 'P2025') return res.status(404).json({ error: 'Payment not found' });
    return res.status(500).json({ error: 'Failed to update payment' });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    await deletePayment(Number(req.params.id));
    return res.json({ data: { message: 'Payment deleted' } });
  } catch (e: any) {
    if (e.code === 'P2025') return res.status(404).json({ error: 'Payment not found' });
    return res.status(500).json({ error: 'Failed to delete payment' });
  }
}
