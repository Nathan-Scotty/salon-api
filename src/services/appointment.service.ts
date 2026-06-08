import prisma from '../lib/prisma';

const include = {
  client: { include: { user: { select: { name: true, email: true, phone: true } } } },
  stylist: { include: { user: { select: { name: true } } } },
  services: { include: { service: true } },
  payment: true,
};

export async function findAllAppointments() {
  return prisma.appointment.findMany({ orderBy: { scheduledAt: 'asc' }, include });
}

export async function findAppointmentById(id: number) {
  return prisma.appointment.findUnique({ where: { id }, include });
}

export async function createAppointment(data: any) {
  const appointment = await prisma.appointment.create({
    data: {
      clientId: data.clientId,
      stylistId: data.stylistId,
      availabilityId: data.availabilityId,
      scheduledAt: new Date(data.scheduledAt),
      notes: data.notes,
    },
  });
  if (data.availabilityId) {
    await prisma.availability.update({ where: { id: data.availabilityId }, data: { isBooked: true } });
  }
  return appointment;
}

export async function updateAppointment(id: number, data: any) {
  return prisma.appointment.update({
    where: { id },
    data: {
      ...(data.scheduledAt ? { scheduledAt: new Date(data.scheduledAt) } : {}),
      ...(data.status ? { status: data.status } : {}),
      ...(data.notes !== undefined ? { notes: data.notes } : {}),
    },
  });
}

export async function deleteAppointment(id: number) {
  const appointment = await prisma.appointment.findUnique({ where: { id } });
  if (appointment?.availabilityId) {
    await prisma.availability.update({ where: { id: appointment.availabilityId }, data: { isBooked: false } });
  }
  return prisma.appointment.delete({ where: { id } });
}
