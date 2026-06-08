import prisma from '../lib/prisma';

export async function findServicesByAppointment(appointmentId: number) {
  return prisma.appointmentService.findMany({ where: { appointmentId }, include: { service: true } });
}

export async function addServiceToAppointment(appointmentId: number, serviceId: number, priceAtTime: number) {
  return prisma.appointmentService.create({ data: { appointmentId, serviceId, priceAtTime } });
}

export async function updateAppointmentServicePrice(appointmentId: number, serviceId: number, priceAtTime: number) {
  return prisma.appointmentService.update({
    where: { appointmentId_serviceId: { appointmentId, serviceId } },
    data: { priceAtTime },
  });
}

export async function removeServiceFromAppointment(appointmentId: number, serviceId: number) {
  return prisma.appointmentService.delete({
    where: { appointmentId_serviceId: { appointmentId, serviceId } },
  });
}
