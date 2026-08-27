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
  const parseTime = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return new Date(Date.UTC(1970, 0, 1, h, m, 0));
  };

  return prisma.availability.create({
    data: {
      stylistId,
      date: new Date(date + 'T12:00:00.000Z'),
      startTime: parseTime(startTime),
      endTime: parseTime(endTime),
    },
  });
}

export async function updateAvailability(id: number, data: any) {
  const parseTime = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return new Date(Date.UTC(1970, 0, 1, h, m, 0));
  };

  return prisma.availability.update({
    where: { id },
    data: {
      ...(data.date ? { date: new Date(data.date + 'T12:00:00.000Z') } : {}),
      ...(data.startTime ? { startTime: parseTime(data.startTime) } : {}),
      ...(data.endTime ? { endTime: parseTime(data.endTime) } : {}),
      ...(data.isBooked !== undefined ? { isBooked: data.isBooked } : {}),
    },
  });
}

export async function deleteAvailability(id: number) {
  return prisma.availability.delete({ where: { id } });
}
