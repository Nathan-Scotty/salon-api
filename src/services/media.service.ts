import prisma from '../lib/prisma';

export async function findMediaByPost(postId: number) {
  return prisma.media.findMany({ where: { postId }, orderBy: { order: 'asc' } });
}

export async function findMediaById(id: number) {
  return prisma.media.findUnique({ where: { id } });
}

export async function createMedia(data: any) {
  return prisma.media.create({ data });
}

export async function updateMedia(id: number, data: any) {
  return prisma.media.update({ where: { id }, data });
}

export async function deleteMedia(id: number) {
  return prisma.media.delete({ where: { id } });
}
