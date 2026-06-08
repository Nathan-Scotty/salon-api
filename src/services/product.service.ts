import prisma from '../lib/prisma';

export async function findAllProducts(activeOnly = false) {
  return prisma.product.findMany({
    where: activeOnly ? { isActive: true } : undefined,
    orderBy: { name: 'asc' },
  });
}

export async function findProductById(id: number) {
  return prisma.product.findUnique({ where: { id } });
}

export async function createProduct(data: any) {
  return prisma.product.create({ data });
}

export async function updateProduct(id: number, data: any) {
  return prisma.product.update({ where: { id }, data });
}

export async function deleteProduct(id: number) {
  return prisma.product.delete({ where: { id } });
}
