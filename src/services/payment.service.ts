import prisma from '../lib/prisma';

export async function findAllPayments() {
  return prisma.payment.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      client: { include: { user: { select: { name: true, email: true } } } },
      appointment: { select: { scheduledAt: true, status: true } },
    },
  });
}

export async function findPaymentById(id: number) {
  return prisma.payment.findUnique({
    where: { id },
    include: {
      client: { include: { user: { select: { name: true, email: true } } } },
      appointment: true,
    },
  });
}

export async function createPayment(data: any) {
  return prisma.payment.create({ data });
}

export async function updatePayment(id: number, data: any) {
  const { paidAt, ...rest } = data;
  return prisma.payment.update({
    where: { id },
    data: { ...rest, ...(paidAt ? { paidAt: new Date(paidAt) } : {}) },
  });
}

export async function deletePayment(id: number) {
  return prisma.payment.delete({ where: { id } });
}
