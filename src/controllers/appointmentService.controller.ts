import { Request, Response } from 'express';
import { findServicesByAppointment, addServiceToAppointment, updateAppointmentServicePrice, removeServiceFromAppointment } from '../services/appointmentService.service';

export async function getByAppointment(req: Request, res: Response) {
  try {
    const appointmentId = Number(req.query.appointmentId);
    if (!appointmentId) return res.status(400).json({ error: 'appointmentId query param is required' });
    return res.json({ data: await findServicesByAppointment(appointmentId) });
  } catch { return res.status(500).json({ error: 'Failed to fetch appointment services' }); }
}

export async function add(req: Request, res: Response) {
  try {
    const { appointmentId, serviceId, priceAtTime } = req.body;
    if (!appointmentId || !serviceId || priceAtTime === undefined) {
      return res.status(400).json({ error: 'appointmentId, serviceId, and priceAtTime are required' });
    }
    return res.status(201).json({ data: await addServiceToAppointment(appointmentId, serviceId, priceAtTime) });
  } catch (e: any) {
    if (e.code === 'P2002') return res.status(409).json({ error: 'Service already added to this appointment' });
    return res.status(500).json({ error: 'Failed to add service' });
  }
}

export async function updatePrice(req: Request, res: Response) {
  try {
    const { appointmentId, serviceId, priceAtTime } = req.body;
    if (!appointmentId || !serviceId || priceAtTime === undefined) {
      return res.status(400).json({ error: 'appointmentId, serviceId, and priceAtTime are required' });
    }
    return res.json({ data: await updateAppointmentServicePrice(appointmentId, serviceId, priceAtTime) });
  } catch { return res.status(500).json({ error: 'Failed to update price' }); }
}

export async function remove(req: Request, res: Response) {
  try {
    const { appointmentId, serviceId } = req.body;
    if (!appointmentId || !serviceId) {
      return res.status(400).json({ error: 'appointmentId and serviceId are required' });
    }
    await removeServiceFromAppointment(appointmentId, serviceId);
    return res.json({ data: { message: 'Service removed from appointment' } });
  } catch { return res.status(500).json({ error: 'Failed to remove service' }); }
}
