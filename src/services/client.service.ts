import prisma from '../lib/prisma';

const include = { user: { select: { id: true, name: true, email: true, phone: true, avatarUrl: true } } };

export async function findAllClients() {
  return prisma.client.findMany({ orderBy: { createdAt: 'desc' }, include });
}

export async function findClientById(id: number) {
  return prisma.client.findUnique({ where: { id }, include });
}

export async function createClient(userId: number, notes?: string) {
  return prisma.client.create({ data: { userId, notes } });
}

export async function updateClient(id: number, data: any) {
  return prisma.client.update({ where: { id }, data });
}

export async function deleteClient(id: number) {
  return prisma.client.delete({ where: { id } });
}
