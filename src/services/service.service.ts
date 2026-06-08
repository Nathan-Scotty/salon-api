import prisma from '../lib/prisma';

export async function findAllServices(activeOnly = false) {
  return prisma.service.findMany({
    where: activeOnly ? { isActive: true } : undefined,
    orderBy: { name: 'asc' },
  });
}

export async function findServiceById(id: number) {
  return prisma.service.findUnique({ where: { id } });
}

export async function createService(data: any) {
  return prisma.service.create({ data });
}

export async function updateService(id: number, data: any) {
  return prisma.service.update({ where: { id }, data });
}

export async function deleteService(id: number) {
  return prisma.service.delete({ where: { id } });
}
