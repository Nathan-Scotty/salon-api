import prisma from '../lib/prisma';

const include = {
  author: { select: { id: true, name: true, avatarUrl: true } },
  media: { orderBy: { order: 'asc' as const } },
};

export async function findAllPosts(publishedOnly = false, category?: string) {
  return prisma.post.findMany({
    where: {
      ...(publishedOnly ? { isPublished: true } : {}),
      ...(category ? { category: category as any } : {}),
    },
    orderBy: { createdAt: 'desc' },
    include,
  });
}

export async function findPostById(id: number) {
  return prisma.post.findUnique({ where: { id }, include });
}

export async function createPost(data: any) {
  return prisma.post.create({ data, include });
}

export async function updatePost(id: number, data: any) {
  return prisma.post.update({ where: { id }, data, include });
}

export async function deletePost(id: number) {
  return prisma.post.delete({ where: { id } });
}
