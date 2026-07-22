import { Request, Response } from 'express';
import { findAllAppointments, findAppointmentById, createAppointment, updateAppointment, deleteAppointment } from '../services/appointment.service';
import prisma from '../lib/prisma';

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

export async function createGuest(req: Request, res: Response) {
  try {
    const { name, email, phone, stylistId, availabilityId, scheduledAt, notes } = req.body;

    if (!name || !email || !stylistId || !scheduledAt) {
      return res.status(400).json({ error: 'name, email, stylistId, and scheduledAt are required' });
    }

    // 1 — Find or create user
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const bcrypt = await import('bcrypt');
      const passwordHash = await bcrypt.hash(Math.random().toString(36), 10);
      user = await prisma.user.create({
        data: { name, email, phone, passwordHash, role: 'CLIENT' },
      });
    }

    // 2 — Find or create client profile
    let client = await prisma.client.findUnique({ where: { userId: user.id } });
    if (!client) {
      client = await prisma.client.create({ data: { userId: user.id } });
    }

    // 3 — Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        clientId: client.id,
        stylistId: Number(stylistId),
        availabilityId: availabilityId ? Number(availabilityId) : undefined,
        scheduledAt: new Date(scheduledAt),
        notes,
      },
    });

    // 4 — Mark slot as booked
    if (availabilityId) {
      await prisma.availability.update({
        where: { id: Number(availabilityId) },
        data: { isBooked: true },
      });
    }

    return res.status(201).json({ data: { appointment, clientName: user.name, clientEmail: user.email } });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to create appointment' });
  }
}