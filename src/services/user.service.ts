import prisma from '../lib/prisma';

const safeSelect = {
  id: true, name: true, email: true, phone: true,
  role: true, avatarUrl: true, createdAt: true, updatedAt: true,
};

export async function findAllUsers() {
  return prisma.user.findMany({ orderBy: { createdAt: 'desc' }, select: safeSelect });
}

export async function findUserById(id: number) {
  return prisma.user.findUnique({ where: { id }, select: safeSelect });
}

export async function updateUser(id: number, data: any) {
  return prisma.user.update({ where: { id }, data, select: safeSelect });
}

export async function deleteUser(id: number) {
  return prisma.user.delete({ where: { id } });
}
