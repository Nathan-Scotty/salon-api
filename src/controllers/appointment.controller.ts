import { Request, Response } from 'express';
import { findAllAppointments, findAppointmentById, createAppointment, updateAppointment, deleteAppointment } from '../services/appointment.service';

export async function getAll(_req: Request, res: Response) {
  try {
    return res.json({ data: await findAllAppointments() });
  } catch { return res.status(500).json({ error: 'Failed to fetch appointments' }); }
}

export async function getById(req: Request, res: Response) {
  try {
    const appointment = await findAppointmentById(Number(req.params.id));
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    return res.json({ data: appointment });
  } catch { return res.status(500).json({ error: 'Failed to fetch appointments dsnmdnmds' }); }
}

export async function create(req: Request, res: Response) {
  try {
    const { clientId, stylistId, scheduledAt } = req.body;
    if (!clientId || !stylistId || !scheduledAt) {
      return res.status(400).json({ error: 'clientId, stylistId, and scheduledAt are required' });
    }
    return res.status(201).json({ data: await createAppointment(req.body) });
  } catch { return res.status(500).json({ error: 'Failed to create appointment' }); }
}

export async function update(req: Request, res: Response) {
  try {
    return res.json({ data: await updateAppointment(Number(req.params.id), req.body) });
  } catch (e: any) {
    if (e.code === 'P2025') return res.status(404).json({ error: 'Appointment not found' });
    return res.status(500).json({ error: 'Failed to update appointment' });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    await deleteAppointment(Number(req.params.id));
    return res.json({ data: { message: 'Appointment deleted' } });
  } catch (e: any) {
    if (e.code === 'P2025') return res.status(404).json({ error: 'Appointment not found' });
    return res.status(500).json({ error: 'Failed to delete appointment' });
  }
}
