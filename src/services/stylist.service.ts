import prisma from '../lib/prisma';

const include = { user: { select: { id: true, name: true, email: true, phone: true, avatarUrl: true } } };

export async function findAllStylists() {
  return prisma.stylist.findMany({ orderBy: { createdAt: 'desc' }, include });
}

export async function findStylistById(id: number) {
  return prisma.stylist.findUnique({
    where: { id },
    include: { ...include, availabilities: { orderBy: { date: 'asc' } } },
  });
}

export async function createStylist(userId: number, bio?: string, specialties?: string) {
  return prisma.stylist.create({ data: { userId, bio, specialties } });
}

export async function updateStylist(id: number, data: any) {
  // Handle avatarUrl update separately on the User model
  const { avatarUrl, ...stylistData } = data;

  if (avatarUrl) {
    const stylist = await prisma.stylist.findUnique({ where: { id } });
    if (stylist) {
      await prisma.user.update({
        where: { id: stylist.userId },
        data: { avatarUrl },
      });
    }
  }

  return prisma.stylist.update({ where: { id }, data: stylistData, include });
}

export async function deleteStylist(id: number) {
  return prisma.stylist.delete({ where: { id } });
}
