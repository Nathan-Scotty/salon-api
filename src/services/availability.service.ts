import prisma from '../lib/prisma';

export async function findAllAvailabilities(stylistId?: number, availableOnly = false) {
  return prisma.availability.findMany({
    where: {
      ...(stylistId ? { stylistId } : {}),
      ...(availableOnly ? { isBooked: false } : {}),
    },
    orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
    include: { stylist: { include: { user: { select: { name: true } } } } },
  });
}

export async function findAvailabilityById(id: number) {
  return prisma.availability.findUnique({
    where: { id },
    include: { stylist: { include: { user: { select: { name: true } } } } },
  });
}

export async function createAvailability(stylistId: number, date: string, startTime: string, endTime: string) {
  return prisma.availability.create({
    data: {
      stylistId,
      date: new Date(date),
      startTime: new Date(`1970-01-01T${startTime}:00`),
      endTime: new Date(`1970-01-01T${endTime}:00`),
    },
  });
}

export async function updateAvailability(id: number, data: any) {
  return prisma.availability.update({
    where: { id },
    data: {
      ...(data.date ? { date: new Date(data.date) } : {}),
      ...(data.startTime ? { startTime: new Date(`1970-01-01T${data.startTime}:00`) } : {}),
      ...(data.endTime ? { endTime: new Date(`1970-01-01T${data.endTime}:00`) } : {}),
      ...(data.isBooked !== undefined ? { isBooked: data.isBooked } : {}),
    },
  });
}

export async function deleteAvailability(id: number) {
  return prisma.availability.delete({ where: { id } });
}
